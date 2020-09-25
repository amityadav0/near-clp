import React, { useEffect, useState, useContext } from "react";

import findCurrencyLogoUrl from "../services/find-currency-logo-url";
import { calcPriceFromIn } from "../services/near-nep21-util";

import { InputsContext } from "../contexts/InputsContext";
import { TokenListContext } from "../contexts/TokenListContext";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { BsCaretDownFill } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";

import styled from "@emotion/styled";
const Theme = styled("div")`
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.body};
  border: 1px solid ${props => props.theme.cardBorder};
  border-radius: 20px;
  box-shadow: 0px 1px 0px 0px ${props => props.theme.cardShadow};
  .form-control:focus {
    color: ${props => props.theme.textInput};
  }
`;

export default function PoolInputCards(props) {

  // Global state
  const inputs = useContext(InputsContext);
  const { dispatch } = inputs;

  // Token list state (used to populate button with token logo and symbol)
  const tokenListState = useContext(TokenListContext);

  // Local state (amount values; needed for updating directly in inputs)
  const [input1Amount, setInput1Amount] = useState("");
  const [input2Amount, setInput2Amount] = useState("");

  // Handles updating button view and input information
  function handleInput1TokenUpdate() {
    // Find URL of token logo, symbol, type, and address of INPUT1 input
    let input1ImageUrl = findCurrencyLogoUrl(inputs.state.pool.input1.tokenIndex, tokenListState.state.tokenList);
    let input1Symbol = tokenListState.state.tokenList.tokens[inputs.state.pool.input1.tokenIndex].symbol;
    let input1Type = tokenListState.state.tokenList.tokens[inputs.state.pool.input1.tokenIndex].type;
    let input1Address = tokenListState.state.tokenList.tokens[inputs.state.pool.input1.tokenIndex].address;
    // Update image, symbol, and type of selected currency
    dispatch({ type: 'UPDATE_INPUT1_SELECTED_CURRENCY', 
      payload: { logoUrl: input1ImageUrl, symbol: input1Symbol, type: input1Type, isValid: false, address: input1Address }
    });
  }
  function handleInput2TokenUpdate() {
    // Find URL of token logo, symbol, type, and address of INPUT2 input
    let input2ImageUrl = findCurrencyLogoUrl(inputs.state.pool.input2.tokenIndex, tokenListState.state.tokenList);
    let input2Symbol = tokenListState.state.tokenList.tokens[inputs.state.pool.input2.tokenIndex].symbol;
    let input2Type = tokenListState.state.tokenList.tokens[inputs.state.pool.input2.tokenIndex].type;
    let input2Address = tokenListState.state.tokenList.tokens[inputs.state.pool.input2.tokenIndex].address;
    // Update image, symbol, and type of selected currency
    dispatch({ type: 'UPDATE_INPUT2_SELECTED_CURRENCY', 
      payload: { logoUrl: input2ImageUrl, symbol: input2Symbol, type: input2Type, isValid: false, address: input2Address }
    });
  }

  // Load icons and symbol for the current selected currency/token
  useEffect(() => {
    handleInput1TokenUpdate();
    handleInput2TokenUpdate();
  }, []);

  // Handle opening modal to select currency
  function handleCurrencySelectionModalInput1() {
    dispatch({ type: 'SET_CURRENCY_SELECTION_INPUT', payload: { input: "input1" } });
  }

  // Handle amount changes
  function handleInput1AmountChange(event) {
    setInput1Amount(event.target.value);
    dispatch({ type: 'SET_INPUT1_AMOUNT', payload: { amount: event.target.value, isValid: true } });
  }
  function handleInput2AmountChange(event) {
    setInput2Amount(event.target.value);
    dispatch({ type: 'SET_INPUT2_AMOUNT', payload: { amount: event.target.value, isValid: true } });
  }

  return (
    <>
      <Theme className="py-2">
        <label className="ml-4 mb-1 mt-0">
          <small className="text-secondary">Input</small>
        </label>
        <Row className="px-2">
          <Col>
            <div className="input-group-lg mb-1">
              <input type="text" value={input1Amount} className="form-control border-0 bg-transparent" placeholder="0.0" onChange={handleInput1AmountChange}/>
            </div>
          </Col>
          <Col xl={2} lg={3} md={4} sm={4} xs={12} className="d-flex flex-row-reverse align-items-center mr-2">
            <div className="text-right">
              <Button size="sm" variant="outline-secondary" className="mr-1" style={{'whiteSpace': 'nowrap'}} onClick={handleCurrencySelectionModalInput1}>
                <img src={inputs.state.pool.input1.logoUrl} width="15px" className="align-middle pb-1" />
                {' '}{inputs.state.pool.input1.symbol}
                {' '}
                <BsCaretDownFill/>
              </Button>
              <br/>
              <small className="mr-3 text-secondary" style={{'whiteSpace': 'nowrap', 'fontSize': '60%'}}>
                {inputs.state.pool.input1.type === "ERC-20"
                  ? <><FaEthereum/> ERC-20</>
                  : inputs.state.pool.input1.type
                }
              </small>
            </div>
          </Col>
        </Row>
      </Theme>
      <div className="text-center my-2">
        <BsPlus/>
      </div>
      <Theme className="py-2">
        <label className="ml-4 mb-1 mt-0">
          <small className="text-secondary">Input</small>
        </label>
        <Row className="px-2">
          <Col>
            <div className="input-group-lg mb-1">
              <input type="text" value={input2Amount} className="form-control border-0 bg-transparent" placeholder="0.0" onChange={handleInput2AmountChange}/>
            </div>
          </Col>
          <Col xl={2} lg={3} md={4} sm={4} xs={12} className="d-flex flex-row-reverse align-items-center mr-2">
            <div className="text-right">
              <Button size="sm" variant="outline-secondary" className="mr-1" style={{'whiteSpace': 'nowrap'}} disabled>
                <img src={inputs.state.pool.input2.logoUrl} width="15px" className="align-middle pb-1" />
                {' '}{inputs.state.pool.input2.symbol}
                {' '}
                <BsCaretDownFill/>
              </Button>
              <br/>
              <small className="mr-3 text-secondary" style={{'whiteSpace': 'nowrap', 'fontSize': '60%'}}>
                {inputs.state.pool.input2.type === "ERC-20"
                  ? <><FaEthereum/> ERC-20</>
                  : inputs.state.pool.input2.type
                }
              </small>
            </div>
          </Col>
        </Row>
      </Theme>
    </>
  );
}
