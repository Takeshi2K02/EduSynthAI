const calculateProgress = (course, userProgress) => {
  let progress = 0;

  course.modules.forEach((mod) => {
    // Lessons
    mod.lessons?.forEach((lesson) => {
      if (userProgress.completedLessons.includes(lesson._id.toString())) {
        progress += lesson.weight;
      }
    });

    // Resources
    mod.resources?.forEach((res) => {
      if (userProgress.completedResources.includes(res._id.toString())) {
        progress += res.weight;
      }
    });

    // Quizzes
    mod.quizzes?.forEach((quiz) => {
      if (userProgress.completedQuizzes.includes(quiz._id.toString())) {
        progress += quiz.weight;
      }
    });
  });

  // Normalize to course.totalWeight
  return parseFloat((progress / course.totalWeight).toFixed(4)); // e.g. 0.75 = 75%
};
