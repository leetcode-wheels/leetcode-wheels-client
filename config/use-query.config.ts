import {
  QueryFunction,
  QueryKey,
  useQuery as useQueryBase,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isAxiosError = (e: AxiosError<Error> | any): e is AxiosError<Error> =>
  'isAxiosError' in e

const retryPolicy = (count: number, e: unknown) =>
  isAxiosError(e) &&
  !([400, 401] as (number | undefined)[]).includes(e.response?.status) &&
  count < 3

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseError = (e: any) =>
  typeof e.response?.data?.messsage === 'string'
    ? e.response.data.message
    : e.response.data?.message?.join(', ') ??
      'Oops! There was an unexpected error'

const useQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> =>
  useQueryBase(queryKey, queryFn, {
    retry: retryPolicy,
    ...options,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (e) =>
      isAxiosError(e) ? toast.error(parseError(e)) : options?.onError?.(e),
  })

export default useQuery
