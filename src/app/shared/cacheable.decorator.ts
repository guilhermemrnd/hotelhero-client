import { Observable, of, tap } from 'rxjs';

const cacheStore = new Map<string, any>();

export function Cacheable(): MethodDecorator {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const key = `${propertyKey}_${JSON.stringify(args)}`;
      if (cacheStore.has(key)) {
        return of(cacheStore.get(key));
      }

      const result = originalMethod.apply(this, args);

      if (result instanceof Observable) {
        return result.pipe(
          tap((data) => {
            cacheStore.set(key, data);
          })
        );
      }

      return result;
    };

    return descriptor;
  };
}
