export default function auth () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Mehul Patel',
        avatar: 'https://pbs.twimg.com/profile_images/759516788665090050/6MQMTebw_400x400.jpg'
        uid: 'letapluhem'
      })
    }, 2000)
  })
}
