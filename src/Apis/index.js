import md5 from 'md5';
import axios from 'axios';
import ApiKeys from './keys';

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
  try 
  {
    const response = await axios.get(url);
    return response.data.data
  }
  catch (error)
  {
    console.error(error);
  }
};

const getComicDetails = async (uri) => {
  const params = getParams()
  const url = `${uri}?${params}`
  try 
  {
    const response = await axios.get(url);
    return response.data.data
  }
  catch (error)
  {
    console.error(error);
  }
}

const Api = {
  listCharacters,
  getComicDetails
}
export default Api