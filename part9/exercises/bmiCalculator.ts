interface bmiValuesInput {
   height: number;
   weight: number;
}

const parseArguments = (args: Array<string>): bmiValuesInput => {
   if (args.length < 4) throw new Error('Not enough arguments');
   if (args.length > 4) throw new Error('Too much arguments');
   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
         height: Number(args[2]),
         weight: Number(args[3]),
      };
   } else {
      throw new Error('Provided values were not numbers');
   }
};

const calculateBmi = (height: number, weight: number): string => {
   const result: number = weight / (height / 100) ** 2;

   if (result < 16) return 'Underweight (Severe thinness)';
   if (result < 17) return 'Underweight (Moderate thinness)';
   if (result < 18.5) return 'Underweight (Mild thinness)';
   if (result < 25) return 'Normal range (healthy weight)';
   if (result < 30) return 'Overweight (Pre-obese)';
   if (result < 35) return 'Obese (Class I)';
   if (result < 40) return 'Obese (Class II)';
   return 'Obese (Class III)';
};

try {
   const { height, weight } = parseArguments(process.argv);
   console.log(calculateBmi(height, weight));
} catch (e) {
   console.log((e as Error).message);
}
