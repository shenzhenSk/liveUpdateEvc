import { MockMethod } from 'vite-plugin-mock'

// rbac
import rbacAPI from './rbac'
// event count
import eventCountAPI from './event_count'

export default [
  // RBAC
  ...rbacAPI,
  // Event Count
  ...eventCountAPI
] as MockMethod[]
