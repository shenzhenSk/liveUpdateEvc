export default async function awaitMoment(time = 10) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
