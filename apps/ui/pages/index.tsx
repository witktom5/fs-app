const callAPI = async () => {
  try {
    const res = await fetch(`/api/`)
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}

const Home = () => {
  return (
    <>
      <div>Home</div>
      <button onClick={callAPI}>click</button>
    </>
  )
}

export default Home
