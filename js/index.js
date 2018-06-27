$(function(){
    let weather;
    $.ajax({
        url:'https://www.toutiao.com/stream/widget/local_weather/data/?city=太原',
        dataType:'jsonp',
        success:function (obj) {
            weather=obj.data.weather;
            console.log(weather);
            render();
        }
    })

    //读取数据
    function render() {
        //城市
        $(".chengshi").html(weather.city_name);
        // 天气
         $(".yun").html(weather.current_condition);
         // 度数

         $(".du").html("&nbsp;"+weather.current_temperature+"°");
         // 几级风
          $(".feng").html(weather.wind_direction+"&nbsp;"+weather.wind_level+"级");
          // 今天的最高温最低温
          $("#du").html(weather.high_temperature+"/"+weather.low_temperature+"°");
           // 明天的最高温最低温
          $("#wendu").html(weather.tomorrow_high_temperature+"/"+weather.tomorrow_low_temperature+"°");
          // 今天的天气
          $("#tianqi").html(weather.current_condition);
          // 明天的天气
           $("#mingtian").html(weather.tomorrow_condition);
           // 今天天气的图片
            $("#topic").attr("src",`img/${weather.weather_icon_id}.png`)
            // 明天天气的图片
    		     $("#mopic").attr("src",`img/${weather.tomorrow_weather_icon_id}.png`)
            // 天气指数
             $(".shusu").html(weather.tomorrow_aqi);
             // 天气状况
             $(".liang").html(weather.tomorrow_quality_level);
    		 // 中间部分
    		 weather.hourly_forecast.forEach(function(element,index){
        	let strs=`<li class="item">
					<p class="tex">${element.hour}:00</p>
					<img src=img/${element.weather_icon_id}.png alt="" class="icon">
					<p class="pos">${element.temperature}°</p>
					</li>`
            $(".zhong").append(strs)
   			 })
   			 // 下面部分
   			 weather.forecast_list.forEach(function(element,index){
       			let tr=`<li class="itemm">
							<p class="riqi">${element.date.slice(5,10)}</p>
							<p class="ying">${element.condition}</p>
							<img src="img/${element.weather_icon_id}.png" alt="" class="img">
							<p class="dushu">${element.high_temperature}°</p>
							<p class="dushu">${element.low_temperature}°</p>
							<img src="img/${element.weather_icon_id}.png" alt="" class="img">
							<p class="wind">${element.wind_direction}</p>
							<p class="sanji">${element.wind_level}级</p>
						</li>`
            $(".zuixia").append(tr)
     })
    }
})