import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { trpc } from '@/config/trpc'
import { UseQueryResult } from 'react-query'

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

export const useTrpcQuery = (
  pathAndInputs: Parameters<typeof trpc.useQuery>[0],
  options?: Parameters<typeof trpc.useQuery>[1]
): UseQueryResult =>
  trpc.useQuery(pathAndInputs, {
    retry: retryPolicy,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onError: (e) =>
      isAxiosError(e) ? toast.error(parseError(e)) : options?.onError?.(e),
    ...options,
  })

export default useTrpcQuery
