import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion, useSpring, useMotionValue } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";

const LERP_FACTOR = 0.18;

const SkillCard = ({ skill, pathColor = "rgb(34,211,238)" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const [smoothValue, setSmoothValue] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const progress = useMotionValue(0);
  const progressSpring = useSpring(progress, { stiffness: 80, damping: 18 });

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const detect = () => {
      const hasDarkClass = document.documentElement.classList.contains("dark");
      setIsDark(hasDarkClass || mq.matches);
    };
    detect();

    const onChange = () => detect();
    mq.addEventListener?.("change", onChange);

    const obs = new MutationObserver(() => detect());
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mq.removeEventListener?.("change", onChange);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    const unsub = progressSpring.on("change", (val) => {
      const clamped = Math.max(0, Math.min(100, val));
      targetRef.current = clamped;
      if (rafRef.current === null) startLoop();
    });
    return () => {
      unsub();
      stopLoop();
    };
  }, [progressSpring]);

  const startLoop = () => {
    if (rafRef.current !== null) return;
    const step = () => {
      const t = targetRef.current;
      let cur = currentRef.current;
      cur = cur + (t - cur) * LERP_FACTOR;
      currentRef.current = cur;
      setSmoothValue(cur);
      setDisplayValue(Math.round(cur));

      if (Math.abs(cur - t) < 0.01) {
        currentRef.current = t;
        setSmoothValue(t);
        setDisplayValue(Math.round(t));
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const stopLoop = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const level = typeof skill?.level === "number" ? skill.level : 0;
    progress.set(level);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    progress.set(0);
  };

  const textColor = isDark ? "#ffffff" : "#111827";
  const trailColor = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.08)";
  const progressTextColor = isDark ? "#111827" : "#ffffff"; // invert for progress text

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="skill-card relative flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md cursor-pointer w-32 h-32 overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-gray-200 dark:hover:bg-gray-700"
      style={{ ["--progress-text"]: progressTextColor }}
    >
      {/* Icon / name layer */}
      <motion.div
        aria-hidden={isHovered}
        animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.93 : 1 }}
        transition={{ duration: 0.22 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        {skill?.logo && (
          <img src={skill.logo} alt={skill.name} className="w-14 h-14 object-contain" />
        )}
        <p className="text-gray-900 dark:text-white text-sm font-semibold mt-2">
          {skill?.name ?? ""}
        </p>
      </motion.div>

      {/* Progress layer */}
      <motion.div
        role="progressbar"
        aria-label={`${skill?.name ?? "skill"} proficiency`}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.96 }}
        transition={{ duration: 0.22 }}
        className="absolute w-24 h-24 flex items-center justify-center"
        style={{ pointerEvents: isHovered ? "auto" : "none" }}
      >
        <CircularProgressbar
          value={smoothValue}
          text={`${displayValue}%`}
          strokeWidth={8}
          styles={buildStyles({
            pathTransitionDuration: 0,
            pathColor: pathColor,
            trailColor,
            textColor: progressTextColor,
            textSize: "18px",
            strokeLinecap: "round",
          })}
        />
      </motion.div>

      {/* Force text color override */}
      <style>{`
        .skill-card .CircularProgressbar-text {
          fill: var(--progress-text) !important;
          color: var(--progress-text) !important;
        }
      `}</style>
    </motion.div>
  );
};

export default React.memo(SkillCard);
