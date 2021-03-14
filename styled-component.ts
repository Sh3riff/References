// Adding props at element level
  - const Whatever = styled.div <{ margin?: number }>`
	    ${props => props.margin});
    `;
    ////// or //////
  - type MarginType = { margin?: number;};
  - const Whatever = styled.div`
	    ${(props: MarginType) => props.margin});
    `;
