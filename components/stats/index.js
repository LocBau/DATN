import { PieChart, BarChart } from "react-native-gifted-charts";
import { View, Text, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
export const Stats = () => {
  const pieData = [
    {
      value: 0,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      // focused: true,
    },
    {value: 0, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
    {value: 0, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
    {value: 0, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
  ];
  
  const barData = [
    {
      value: 40,
      label: 'Jan',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 20, frontColor: '#ED6665'},
    {
      value: 50,
      label: 'Feb',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 40, frontColor: '#ED6665'},
    {
      value: 75,
      label: 'Mar',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 25, frontColor: '#ED6665'},
    {
      value: 30,
      label: 'Apr',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 20, frontColor: '#ED6665'},
    {
      value: 60,
      label: 'May',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 40, frontColor: '#ED6665'},
    {
      value: 65,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
    {
      value: 65,
      label: 'Jul',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
    {
      value: 65,
      label: 'Aug',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
    {
      value: 65,
      label: 'Sep',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
    {
      value: 65,
      label: 'Oct',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
    {
      value: 65,
      label: 'Nov',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
    {
      value: 65,
      label: 'Dec',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
  ];

  const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

 
  const [pie, setpie] = useState(pieData);
  const [bar, setbar] = useState(barData);
  const [month, setmonth] = useState(10);
  const [year, setyear] = useState(2023);
  const [refresh, setrefresh] = useState(true);
  const [viewstat, setview] = useState(true);

  let isFocused = useIsFocused();
  useEffect(()=> {
    console.log("asd");
    async function getData () {
      let _data = await AsyncStorage.getItem('tasks');
      if(_data) {
        _data = JSON.parse(_data);
      }
      if (_data) {
        _data = _data.task;
      }

      console.log(_data);
      if (_data) {
        setPieView(_data);
        setBarView(_data);
        // console.log(pie);
      }
    }
    getData();
  },[ refresh, year, month])

  const setPieView = async (_data)   => {
    let done = 0;
    let inprogress = 0;
    let late = 0;
    let others = 0;
    let d = new Date();
    d = d.getTime();
    for (const i of _data) {
      if (i.due) {
        let due = new Date(i.due);
        if(due.getMonth()!=(Math.abs(month))) continue;
        if (i.done) {
          done++;
        } else {
          let j = new Date(i.due);
          j = j.getTime();
          if (d >= j) {
            inprogress++;
          } else {
            late++;
          }
        }
      } else {
        let create_at = new Date(i.create_at);
        if(create_at.getMonth()!=Math.abs(month)) continue;
        others++;
      }
    }
    let newPie = pieData;
    newPie[0].value = done;
    newPie[1].value = inprogress;
    newPie[2].value = late;
    newPie[3].value = others;
    console.log(others);
    if(!done && !inprogress && !late && !others) {
      setpie([{
        value: 0,
        color: '#009FFF',
        gradientCenterColor: '#006DFF',
        // focused: true,
      }])
    } else {
      setpie(newPie);
    }
    
    setrefresh(false)
  }

  const setBarView = async (_data)   => {

    let newbar = barData;
    for (let _month = 0; _month < 12; _month++) {
      let done = 0;
      let total = 0;
      for (const i of _data) {
        let create_at = new Date(i.create_at);
        if(create_at.getFullYear() !=year) continue;
        if (i.due) {
          let due = new Date(i.due);
          if(due.getMonth()!=_month) continue;
          if (i.done) {
            done++;
          } else {
            total++;
          }
        } else {
          
          if(create_at.getMonth()!=_month) continue;
          total++;
        }
      }
      newbar[_month*2].value = done;
      newbar[_month*2 +1].value = total;
    }
    
    console.log(newbar);
    setbar(newbar);
    setrefresh(false)
  }

  

const renderDot = color => {
  return (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );
};

const renderLegendComponent = () => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot('#006DFF')}
          <Text style={{color: 'white'}}>Done: {pie[0]?.value || 0 }</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#3BE9DE')}
          <Text style={{color: 'white'}}>Inprogress: {pie[1]?.value || 0}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot('#8F80F3')}
          <Text style={{color: 'white'}}>Late: {pie[2]?.value || 0}</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#FF7F97')}
          <Text style={{color: 'white'}}>Others: {pie[3]?.value || 0}</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#FFFFFF')}
          <Text style={{color: 'white'}}>Total: {pie[0]?.value+pie[1]?.value+pie[2]?.value+pie[3]?.value || 0}</Text>
        </View>
      </View>
    </>
  );
};
// ---------------------------------------------



const renderTitle = () => {
    return(
      <View style={{marginVertical: 10}}>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 24,
          backgroundColor: 'yellow',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#177AD5',
              marginRight: 8,
            }}
          />
          <Text
            style={{
              width: 60,
              height: 16,
              color: 'lightgray',
            }}>
            Total
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#ED6665',
              marginRight: 8,
            }}
          />
          <Text
            style={{
              width: 60,
              height: 16,
              color: 'lightgray',
            }}>
            Done
          </Text>
        </View>
      </View>
    </View>
    )
}

return (
  <View
    style={{
      // paddingVertical: 100,
      backgroundColor: '#34448B',
      flex: 1,
    }}>
    {viewstat ? (
      <View>
        <View
      style={{
        margin: 10,
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#232B5D',
      }}>
        <TouchableOpacity
        onPress={()=> {
          setmonth(((month +1)%12));
        }}
      >
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign:'center'}}>
        +
      </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=> {
          setmonth((((month -1) < 0 ? 11 : (month -1))%12));
        }}
      >
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign:'center'}}>
        -
      </Text>
      </TouchableOpacity>
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
        {MONTH[Math.abs(month)]}
      </Text>
      
      <View style={{padding: 6, alignItems: 'center'}}>
        <PieChart
          data={pie}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={'#232B5D'}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                  {pie[0]?.value ? Math.round(pie[0].value*100/(pie[0].value+pie[1].value+pie[2].value+pie[3].value)) : 0}%
                </Text>
                <Text style={{fontSize: 14, color: 'white'}}>Done</Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
    <View
      style={{
        margin: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#232B5D',
      }}>

      <TouchableOpacity
        onPress={()=> {
          setyear(year +1);
        }}
      >
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign:'center'}}>
        +
      </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=> {
          setyear(year -1);
        }}
      >
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign:'center'}}>
        -
      </Text>
      </TouchableOpacity>
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign:'center'}}>
        {year}
      </Text>
    <BarChart
          data={bar}
          barWidth={8}
          spacing={24}
          roundedTop
          roundedBottom
          isAnimated
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{color: 'gray'}}
          noOfSections={3}
          maxValue={30}
        />
        {renderTitle()}
        </View>
        <TouchableOpacity
        onPress={()=>{setview(false)}}
        >
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign:'center'}}>
          Switch view here
          </Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View>
        {/* add ana here ... */}
        <TouchableOpacity
        onPress={()=>{setview(true)}}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign:'center'}}>
          Switch view here
          </Text>
        </TouchableOpacity>
      </View>
    )}
  </View>);
}

