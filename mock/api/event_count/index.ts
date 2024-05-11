import { MockMethod } from 'vite-plugin-mock';
import { readJson } from '../../utils/readJson';
const baseUrl = './mock/api/event_count';

export default [
  // test
  {
    url: '/api/test',
    method: 'post',
    response: readJson('./data/test.json', baseUrl),
  },
] as MockMethod[];
