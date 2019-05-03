# test_rn
Test task for React-native


from 
https://docs.google.com/document/d/1It8DSU-8pjkMN2Ub5-mc3wj8WGadc0W1alqdOJfNRyE/edit
at 04/16/2019 

react-native run-android


https://reactnavigation.org/docs/en/getting-started.html 
?ios/podfile


need optimization 
//render Table
//)virtaualized list (render only visble)
//rerender
//)rerender only changed string

need fix
) for USDT_BTC digits go to next line


after FlatList
)last element half-view
	render ListFootComponent with empty
)network error


spinner
	after screan change: ok
?	after return myApp(screan Quotes)-->otherApp-->myApp: no spinner
		no net requests when myApp not active


dont work react-navigation.AppContainer and context Api
// <AppContext.Provider value={this.state}>
//   <AppContainer/>;
// </AppContext.Provider>

next
useReducer
? screanQoutes --> screanAbout --> screanQoutes
in last pause before spinner, short time for spinner, empty screan