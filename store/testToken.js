// import TestToken from '~/contracts/TestToken'
// import web3Abi from 'web3-eth-abi'

export const state = () => ({
  tokenAddress: '0x734729A56021fEFa794a57BDAc72bfF55CFbb5B7'
})

export const getters = {
  tokenAddress (state) {
    return state.tokenAddress
  }
}
