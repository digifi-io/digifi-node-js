interface ISearchHighlight {
  score: number;
  path: string;
  texts: {
    value: string;
    type: string;
  }[];
}

export default ISearchHighlight;
