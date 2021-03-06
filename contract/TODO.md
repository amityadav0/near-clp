### Checks

+ For token->* swaps, validate token allowance before updating the contract state.
  Currently the exception in the `transfer_from` function is not handled.


Handle exceptions in _foreign_ contracts (notably token contracts). Tips how to do it are in a [StackOverflow question](https://stackoverflow.com/questions/62987417).

Places to change:
+ add_liquidity

Tips:
+ https://github.com/nearprotocol/NEPs/pull/26

### CLP related functionality

+ add non integer type for balances to calculate expected amount. We can do it using [decimate](https://crates.io/crates/decimate)
+ add weights
+ change fees calculation for token 2 token swaps

### Economics

+ Add storage costs calculations (based on fungible token example)
+ remove / limit Impermanent Loss problem

### UI / Explorer functionality

+ Create and support multitoken standard. Each pool have their own share tokens. By using a multi-token standard, we can integrate the contract with future token explorer platforms.
