/*
  Filename: store_component_mapper.js
  Description:
    Reusable getters/mutations/actions for vuex store components.
*/
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  props: ['nameSpace'],
  beforeCreate () {
    const moduleName = `${this.$options.propsData.nameSpace}/`
    const getterKeys = Reflect.ownKeys(this.$store.getters).reduce(
      (prev, current) => {
        const splitString = current.split(moduleName)
        if (
          splitString.length === 2 &&
          splitString[1].split('/').length === 1
        ) {
          prev[splitString[1]] = current
        }
        return prev
      },
      {}
    )
    const mutationKeys = Reflect.ownKeys(this.$store._mutations).reduce(
      (prev, current) => {
        const splitString = current.split(moduleName)
        if (
          splitString.length === 2 &&
          splitString[1].split('/').length === 1
        ) {
          prev[splitString[1]] = current
        }
        return prev
      },
      {}
    )
    const actionKeys = Reflect.ownKeys(this.$store._actions).reduce(
      (prev, current) => {
        const splitString = current.split(moduleName)
        if (
          splitString.length === 2 &&
          splitString[1].split('/').length === 1
        ) {
          prev[splitString[1]] = current
        }
        return prev
      },
      {}
    )
    this.$options.computed = {
      ...this.$options.computed,
      ...mapGetters(getterKeys)
    }
    this.$options.methods = {
      ...this.$options.methods,
      ...mapMutations(mutationKeys),
      ...mapActions(actionKeys)
    }
  }
}
