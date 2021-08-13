import { MutationFunction, MutationKey, UseMutationOptions, UseMutationResult } from "react-query";

export declare function useMutation<TData = unknown, TError = unknown, TVariables = any, TContext = unknown>(options: UseMutationOptions<TData, TError, TVariables, TContext>): UseMutationResult<TData, TError, TVariables, TContext>;
export declare function useMutation<TData = unknown, TError = unknown, TVariables = any, TContext = unknown>(mutationFn: MutationFunction<TData, TVariables>, options?: UseMutationOptions<TData, TError, TVariables, TContext>): UseMutationResult<TData, TError, TVariables, TContext>;
export declare function useMutation<TData = unknown, TError = unknown, TVariables = any, TContext = unknown>(mutationKey: MutationKey, options?: UseMutationOptions<TData, TError, TVariables, TContext>): UseMutationResult<TData, TError, TVariables, TContext>;
export declare function useMutation<TData = unknown, TError = unknown, TVariables = any, TContext = unknown>(mutationKey: MutationKey, mutationFn?: MutationFunction<TData, TVariables>, options?: UseMutationOptions<TData, TError, TVariables, TContext>): UseMutationResult<TData, TError, TVariables, TContext>;
