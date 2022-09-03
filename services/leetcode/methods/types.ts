import z from 'zod'

import { userProfileResponseValidator } from './validators'

export type UserProfileResponse = z.infer<typeof userProfileResponseValidator>
