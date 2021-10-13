interface Result {
   periodLength: number;
   trainingDays: number;
   success: boolean;
   rating: number;
   ratingDescription: string;
   target: number;
   average: number;
}

interface inputValue {
   target: number;
   hours: Array<number>;
}

const parseExercisesArgs = (args: Array<string>): inputValue => {
   if (args.length < 4) throw new Error('Not enough arguments');

   // args[0, 1, 2(target), 3(...hours)]
   const [, , target, ...hours] = args.map((arg: string): number =>
      Number(arg)
   );

   // check if there is undefined/null value in hours-array
   const isNaNHours = hours.find((h: number): boolean => isNaN(h));

   if (!isNaN(target) && isNaNHours === undefined) {
      return {
         target: Number(args[2]),
         hours,
      };
   } else {
      throw new Error('Provided values were not numbers');
   }
};

const calculateExercises = (hours: Array<number>, target: number): Result => {
   const periodLength: number = hours.length;
   const trainingDays: number = hours.filter((h) => h > 0).length;

   const average: number =
      hours.reduce((sum: number, current: number): number => sum + current, 0) /
      periodLength;

   const ratingValue: number = average - target;
   const rating: number =
      ratingValue < -0.5 ? 1 : -0.5 < ratingValue && ratingValue < 0 ? 2 : 3;

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

try {
   const { target, hours } = parseExercisesArgs(process.argv);
   console.log(calculateExercises(hours, target));
} catch (e) {
   console.log('Error, something bad happened, message:', e.message);
}
