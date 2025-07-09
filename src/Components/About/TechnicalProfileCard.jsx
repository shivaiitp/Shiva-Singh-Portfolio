import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaLink, FaTrophy, FaCode } from 'react-icons/fa';
import leetcodeLogo from '../../assets/codingProfiles/leetcode.svg';
import codeforcesLogo from '../../assets/codingProfiles/cf.svg';
import gfgLogo from '../../assets/codingProfiles/gfg.svg';

const platformDetails = {
  leetcode: {
    color: 'from-yellow-400 via-orange-500 to-red-500',
    logo: leetcodeLogo,
    api: (username) => ({
      solvedUrl: `https://leetcode-stats-api.herokuapp.com/${username}`,
      contestUrl: `https://alfa-leetcode-api.onrender.com/${username}/contest`,
    }),
    extractData: async ({ solvedUrl, contestUrl }) => {
      try {
        const [solvedRes, contestRes] = await Promise.all([
          fetch(solvedUrl),
          fetch(contestUrl),
        ]);

        const solvedData = await solvedRes.json();
        const contestData = await contestRes.json();

        return {
          totalSolved: solvedData.totalSolved || 'N/A',
          rating: contestData.contestRating ? Math.round(contestData.contestRating) : 'N/A',
        };
      } catch (err) {
        return {
          totalSolved: 'Error',
          rating: 'Error',
        };
      }
    },
  },
  codeforces: {
    color: 'from-blue-500 via-purple-600 to-indigo-700',
    logo: codeforcesLogo,
    getData: async (username) => {
      try {
        const [infoRes, statusRes] = await Promise.all([
          fetch(`https://codeforces.com/api/user.info?handles=${username}`),
          fetch(`https://codeforces.com/api/user.status?handle=${username}`),
        ]);

        const info = await infoRes.json();
        const status = await statusRes.json();

        const solvedSet = new Set();
        status.result.forEach((sub) => {
          if (sub.verdict === 'OK') solvedSet.add(sub.problem.contestId + '-' + sub.problem.index);
        });

        return {
          totalSolved: solvedSet.size,
          rating: info.result[0]?.rating || 'N/A',
        };
      } catch {
        return { totalSolved: 'N/A', rating: 'N/A' };
      }
    },
  },
  geeksforgeeks: {
    color: 'from-green-500 via-emerald-600 to-teal-600',
    logo: gfgLogo,
    getData: async (username) => {
      try {
        const res = await fetch(`/${username}`);
        const data = await res.json();

        return {
          totalSolved: data.totalProblemsSolved || 'N/A',
          rating: data.codingScore || 'N/A',
        };
      } catch (err) {
        return {
          totalSolved: 'Error',
          rating: 'N/A',
        };
      }
    },
  },
};

const TechnicalProfileCard = ({
  platform,
  username,
  profileLink,
  fallbackStats = { totalSolved: 'N/A', rating: 'N/A' },
}) => {
  const [stats, setStats] = useState(fallbackStats);
  const [loading, setLoading] = useState(true);

  const normalizedPlatform = platform.toLowerCase();
  const platformData = platformDetails[normalizedPlatform];

  useEffect(() => {
    const fetchData = async () => {
      if (!platformData) return;

      try {
        let data;

        if (platformData.getData) {
          data = await platformData.getData(username);
        } else if (platformData.api && platformData.extractData) {
          const urls = platformData.api(username);
          data = await platformData.extractData(urls);
        }

        if (data && data.totalSolved !== 'Error' && data.rating !== 'Error') {
          setStats(data);
        }
      } catch (err) {
        console.error(`Error fetching ${platform} stats:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, platformData]);

  if (!platformData) return null;

  const ratingLabel = normalizedPlatform === 'geeksforgeeks' ? 'Coding Score' : 'Contest Rating';

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        scale: 1.02,
        y: -5,
        rotateY: 5,
        boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative bg-gradient-to-br ${platformData.color} p-6 rounded-3xl shadow-2xl text-white w-full sm:w-[380px] overflow-hidden group cursor-pointer`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23ffffff\" fill-opacity=\"0.1\"><circle cx=\"30\" cy=\"30\" r=\"2\"/></g></svg>')",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Header Section */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        variants={itemVariants}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="relative"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl p-2 shadow-lg">
              <img
                src={platformData.logo}
                alt={`${platform} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          <motion.span 
            className="capitalize text-xl md:text-2xl font-semibold"
            variants={itemVariants}
            animate={{
              textShadow: [
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.8)",
                "0 0 10px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {platform}
          </motion.span>
        </div>
        
        <motion.a
          href={profileLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaLink size={12} />
          <span className="font-medium">Profile</span>
        </motion.a>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="grid grid-cols-2 gap-4"
        variants={itemVariants}
      >
        {/* Problems Solved */}
        <motion.div 
          className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <FaCode className="text-white/80" size={16} />
            </motion.div>
            <p className="text-xs font-medium text-white/80">Problems Solved</p>
          </div>
          <motion.p 
            className="text-xl font-bold"
            animate={loading ? {
              opacity: [0.5, 1, 0.5]
            } : {}}
            transition={loading ? {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
          >
            {loading ? fallbackStats.totalSolved : stats.totalSolved}
          </motion.p>
        </motion.div>

        {/* Rating */}
        <motion.div 
          className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <FaTrophy className="text-yellow-300" size={16} />
            </motion.div>
            <p className="text-xs font-medium text-white/80">{ratingLabel}</p>
          </div>
          <motion.p 
            className="text-xl font-bold"
            animate={loading ? {
              opacity: [0.5, 1, 0.5]
            } : {}}
            transition={loading ? {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
          >
            {loading ? fallbackStats.rating : stats.rating}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Loading Overlay */}
      {loading && (
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          viewport={{ once: true}}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-2 left-2 w-2 h-2 bg-white/40 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-2 right-2 w-2 h-2 bg-white/40 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
    </motion.div>
  );
};

export default TechnicalProfileCard;
