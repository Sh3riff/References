// Adding props at element level
  - const Whatever = styled.div <{ margin?: number }>`
	    ${props => props.margin || 5 });
	    ${({margin}) => margin || 5});
    `;
    ////// or //////
  - type MarginType = { margin?: number;};
  - const Whatever = styled.div<MarginType>`
	    ${props => props.margin});
    `;
    ////// or //////
  - type MarginType = { margin?: number;};
  - const Whatever = styled.div`
	    ${(props: MarginType) => props.margin});
    `;



  - const Heading = styled.h1<{ active: boolean }>`
     color: ${props => (props.active ? 'red' : 'blue')};
    `;


## CSS HELPER

const commonStyle = css<{buttonVariant: 'primary' | 'secondary', marginRight: number}>`
  all: unset;
  background-color: ${({buttonVariant}) => buttonVariant === 'primary' ? '#191A1B' : '#E5E5E5'};
  color: ${({buttonVariant}) => buttonVariant === 'primary' ? '#ffffff' : '#191A1B'};
  padding: 12px 18px;
  margin-right: ${({marginRight}) => marginRight + 'px'};
  border-radius: 8px;
  cursor: pointer;
`;

const LinkStyle = styled(Link)`
  ${() => commonStyle}
`;

IF THE PROPS IS NEEDED, YOU MAY USE

const ButtonStyle = styled.button`
  ${(props) => prope.primary ? "this" : "that"}
`;
