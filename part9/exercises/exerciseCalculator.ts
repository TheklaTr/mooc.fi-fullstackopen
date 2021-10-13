interface Result {
   periodLength: number;
   trainingDays: number;
   success: boolean;
   rating: number;
   ratingDescription: string;
   target: number;
   average: number;
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
   const periodLength: number = hours.length;
   const trainingDays: number = hours.filter((h) => h > 0).length;

   const average: number =
      hours.reduce((sum: number, current: number): number => sum + current, 0) /
      periodLength;

   const ratingValue: number = average - target;
   const rating: number =
      ratingValue < -0.5
         ? 1
         : ratingValue > -0.5 && ratingValue > -0.75
         ? 2
         : 3;

   const ratingDescription: string =
      rating === 1
         ? 'need to work harder!'
         : rating === 2
         ? 'not too bad but could be better'
         : 'Great job!';

   return {
      periodLength,
      trainingDays,
      success: average >= target,
      rating,
      ratingDescription,
      target,
      average,
   };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(calculateExercises([1, 0, 2, 4.5, 0, 3, 1, 0, 4], 2));
