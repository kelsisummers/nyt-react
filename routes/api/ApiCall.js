// require('dotenv').config();

// export const urlFriendly = (clientQuery) => {
//   const query = clientQuery.reduce((query, item, i, arr) => {
//     const [kvp] = Object.entries(item);
//     const value = kvp[1]
//       .replace(/ /g, '+')
//       .replace(/[\/-]/g, '')
//       .toLowerCase();

//     let string = `${kvp[0]}=${value}${i < arr.length - 1 ? '&' : ''}`;
//     return query + string;
    
//   }, '')
//   return query;
// };

// export const ApiCall = (req, res) => {
//   const queryString = urlFriendly(req);

//   console.log('what is queryString', queryString);
//   const apiUrl = `https://www.getKitties.com?apikey=${process.env.API_KEY}&`
//   axios.get(apiUrl + queryString).then(data => {
//     res.json(data)
//     console.log('our return data would be', data);
//   })
// }