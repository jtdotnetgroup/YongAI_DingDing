import store from '@/store'

export async function CheckToken() {
    return await new Promise(async (resolve, reject) => {
    await store.dispatch('GetCode')
     const result = await store.dispatch('GetAccessTokenData');
     resolve(result);
    })
}