import { Apis } from 'bitsharesjs-ws';

export async function getObject(id) {
  const [result] = await getObjects([id]);
  return result;
}

export async function getObjects(ids) {
  return await Apis.instance()
    .db_api()
    .exec('get_objects', [ids]);
}
