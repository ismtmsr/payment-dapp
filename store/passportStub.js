import PassportStub from '~/contracts/PassportStub'
import web3Abi from 'web3-eth-abi'

export const state = () => ({
  passportStubAddress: '0x8ed5Eb1195152281EC58F8342778BD7A99d4ed68'
})

export const getters = {
  passportStubAddress (state) {
    return state.passportStubAddress
  }
}
