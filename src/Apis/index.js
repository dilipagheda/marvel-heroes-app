import md5 from 'md5';
import axios from 'axios';
import ApiKeys from './keys';

/*
Create a file called keys.js in src/Apis directory. This file should hold public and private keys of Marvel API as follows.
const ApiKeys = {
  privateKey:'<insert private key>',
  publicKey:'<insert public key>'
}

export default ApiKeys
*/

const privateKey = ApiKeys.privateKey;
const publicKey = ApiKeys.publicKey;
const limit = 9

const generateHash = (timestamp, privateKey, publicKey) =>
 md5(`${timestamp}${privateKey}${publicKey}`);

const getParams = () => {
  const timestamp = Date.now()
  const hash = generateHash(timestamp.toString(), privateKey, publicKey);
  const params = `apikey=${publicKey}&ts=${timestamp}&hash=${hash}`;
  return params
}
 
const listCharacters = async (pageNumber,nameStartsWith) => {
  const offset = pageNumber * limit
 const params = getParams()

 const url = nameStartsWith.length > 0 ? 
                    `https://gateway.marvel.com/v1/public/characters?${params}&limit=${limit}&offset=${offset}&nameStartsWith=${nameStartsWith}`
                    : `https://gateway.marvel.com/v1/public/characters?${params}&limit=${limit}&offset=${offset}`
  const response = await axios.get(url);
  return response.data.data
};

const getComicDetails = async (uri) => {
  const params = getParams()
  const url = `${uri}?${params}`
  const response = await axios.get(url);
  return response.data.data
}

const Api = {
  listCharacters,
  getComicDetails
}
export default Api