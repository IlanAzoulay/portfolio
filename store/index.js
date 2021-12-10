
export const state = () => ({
    scrollRef: 0
})
  
export const mutations = {
    scrollTo(state, {ref}) {
        state.scrollRef = ref;
    }
}

