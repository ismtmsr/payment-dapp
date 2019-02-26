<template>
  <v-layout
    row
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md8
    >
      <v-form ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-select
          v-model="uri"
          :items="networks"
          :rules="[v => !!v || 'network is required']"
          label="ethereum network"
          required
        ></v-select>

        <v-select
          v-model="selectedAccountAddress"
          :items="accounts"
          :rules="[v => !!v || 'account address is required']"
          label="account address"
          required
        >
        </v-select>

        <v-layout row justify-center>
          <v-flex xs12>
            <v-text-field
              label="TestToken address"
              v-model="tokenAddress"
              disabled>
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
          <v-flex xs12>
            <v-text-field
              label="PassportStub address"
              v-model="passportStubAddress"
              disabled>
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
          <v-card flat color="transparent">
            <v-btn
              @click="request"
              >
              <span>Request payment to DataWallet</span>

            </v-btn>
          </v-card>
        </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from 'vuex'
import TestToken from '~/contracts/TestToken'
import Web3 from 'web3'

export default {
  name: 'index',
  data: () => ({
    valid: true,
    uri: '',
    selectedAccountAddress: ''
  }),
  computed: {
    ...mapGetters({
      tokenAddress: 'testToken/tokenAddress',
      passportStubAddress: 'passportStub/passportStubAddress',
      accounts: 'web3/accounts',
      networks: 'web3/networks'
    })
  },
  methods: {
    /**
     * ERC20トークンを送付する
     */
    async request () {
      if (this.$refs.form.validate()) {
        const web3 = new Web3(new Web3.providers.HttpProvider(
          this.uri
        ))
        // console.debug('web3:', web3)

        const testToken = web3.eth
          .contract(TestToken.abi).at(this.tokenAddress)

        testToken.transfer(
          this.passportStubAddress,
          0,
          {
            from: this.selectedAccountAddress,
            gas: 5000000
          },
          (err, receipt) => {
            if (err){
              console.error(err)
            } else {
              console.debug('transfered. receipt:', receipt)
            }
          }
        )
        // console.debug('testToken:', testToken)
        // testToken.balanceOf(
        //   this.selectedAccountAddress,
        //   (err, balance) => {
        //     if (err) {
        //       console.error(err)
        //     } else {
        //       // console.debug('token balance:', web3.fromWei(balance))
        //       console.debug('token balance:', web3.fromWei(balance.toString()))
        //     }
        //   })
      }
    }
  }
}
</script>
