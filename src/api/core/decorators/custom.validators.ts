import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsBiggerThan(
  property: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isBiggerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedValue] = args.constraints;
          // const relatedValue = property;
          const finalValue = parseInt(value, 10);

          return (
            typeof finalValue === 'number' &&
            typeof relatedValue === 'number' &&
            finalValue >= relatedValue
          );
        },
      },
    });
  };
}

export function IsLessThan(
  property: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isLessThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedValue] = args.constraints;
          // const relatedValue = property;
          const finalValue = parseInt(value, 10);

          return (
            typeof finalValue === 'number' &&
            typeof relatedValue === 'number' &&
            finalValue <= relatedValue
          );
        },
      },
    });
  };
}
