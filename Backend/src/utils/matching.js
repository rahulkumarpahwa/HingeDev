/**
 * Matching Algorithm Utilities
 * Calculates compatibility scores between users based on:
 * - Skills overlap
 * - Bio / About semantic similarity (embeddings)
 * - Experience level compatibility
 * - Location proximity
 */

// ==========================================
// 1. EMBEDDING GENERATION (Simple Version - Start Here)
// ==========================================

/**
 * Generate embedding for user's bio
 * MVP Version: Simple text hashing (non-AI)
 * TODO: Replace with real Hugging Face embeddings later
 */
const generateBioEmbedding = (bioText) => {
  try {
    if (!bioText || bioText.length === 0) {
      return new Array(384).fill(0);
    }

    const embedding = new Array(384).fill(0);
    const words = bioText.toLowerCase().split(/\s+/);

    // Simple approach: distribute word info across vector
    embedding[0] = bioText.length / 100;
    embedding[1] = words.length / 10;

    for (let i = 0; i < words.length; i++) {
      const charSum = words[i]
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);
      embedding[(i % 380) + 2] = (charSum % 100) / 100;
    }

    return embedding;
  } catch (error) {
    console.error("Embedding generation error:", error);
    return new Array(384).fill(0);
  }
};

// ==========================================
// 2. SIMILARITY CALCULATIONS
// ==========================================

/**
 * Calculate cosine similarity between two vectors
 * Returns: -1 (opposite) to 1 (identical)
 */
const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB || vecA.length !== vecB.length) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) return 0;

  return dotProduct / (normA * normB);
};

/**
 * Calculate skill overlap percentage (Jaccard similarity)
 */
const calculateSkillOverlap = (userSkills = [], candidateSkills = []) => {
  if (userSkills.length === 0 || candidateSkills.length === 0) {
    return 0;
  }

  const userSet = new Set(userSkills.map((s) => s.toLowerCase()));
  const candidateSet = new Set(candidateSkills.map((s) => s.toLowerCase()));

  const intersection = new Set([...userSet].filter((x) => candidateSet.has(x)));
  const union = new Set([...userSet, ...candidateSet]);

  return (intersection.size / union.size) * 100;
};

/**
 * Calculate location proximity score
 */
const calculateLocationScore = (userLocation = {}, candidateLocation = {}) => {
  const userCountry = userLocation?.country?.toLowerCase() || "";
  const candidateCountry = candidateLocation?.country?.toLowerCase() || "";
  const userCity = userLocation?.city?.toLowerCase() || "";
  const candidateCity = candidateLocation?.city?.toLowerCase() || "";

  if (userCity && candidateCity && userCity === candidateCity) {
    return 100; // Same city
  }
  if (userCountry && candidateCountry && userCountry === candidateCountry) {
    return 50; // Same country
  }
  return 0; // Different location
};

/**
 * Calculate experience level compatibility
 */
const calculateExperienceCompatibility = (
  userLevel = "intermediate",
  candidateLevel = "intermediate"
) => {
  const levels = ["beginner", "intermediate", "advanced", "expert"];
  const userIndex = levels.indexOf(userLevel);
  const candidateIndex = levels.indexOf(candidateLevel);

  const diff = Math.abs(userIndex - candidateIndex);
  if (diff === 0) return 100;
  if (diff === 1) return 70;
  if (diff === 2) return 40;
  return 20;
};

/**
 * Calculate bio similarity from embeddings
 */
const calculateBioSimilarity = (userBioEmbedding, candidateBioEmbedding) => {
  if (!userBioEmbedding || !candidateBioEmbedding) {
    return 0;
  }

  const similarity = cosineSimilarity(userBioEmbedding, candidateBioEmbedding);
  return ((similarity + 1) / 2) * 100; // Convert [-1, 1] to [0, 100]
};

// ==========================================
// 3. COMPOSITE MATCH SCORE
// ==========================================

/**
 * Calculate overall match score (0-100)
 * Weights: Skills 30% + Bio 30% + Experience 20% + Location 20%
 */
const calculateMatchScore = (currentUser, candidate) => {
  const skillScore = calculateSkillOverlap(
    currentUser.skills,
    candidate.skills
  );
  const bioScore = calculateBioSimilarity(
    currentUser.bioEmbedding,
    candidate.bioEmbedding
  );
  const experienceScore = calculateExperienceCompatibility(
    currentUser.experienceLevel,
    candidate.experienceLevel
  );
  const locationScore = calculateLocationScore(
    currentUser.location,
    candidate.location
  );

  const matchScore =
    skillScore * 0.3 + bioScore * 0.3 + experienceScore * 0.2 + locationScore * 0.2;

  return Math.round(matchScore);
};

// ==========================================
// 4. EXPORTS
// ==========================================

module.exports = {
  generateBioEmbedding,
  cosineSimilarity,
  calculateSkillOverlap,
  calculateLocationScore,
  calculateExperienceCompatibility,
  calculateBioSimilarity,
  calculateMatchScore,
};