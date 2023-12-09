export const useTypedWord = (
  word: string,
  state: string[],
  setState: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const wordArray = word.split('')
  return wordArray.forEach((letter: string, index: number) => {
    setTimeout(() => {
      setState([...state, letter])
    }, 1000*index)
  })
}