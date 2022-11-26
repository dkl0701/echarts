// 自执行的函数的好处  可以控制变量的作用域 
// 在其他的地方就可以使用相同的类名 而不会产生冲突


// 监控模块
(function () {

    // 获取点击的tabs  choseTab
    var choseTab = document.getElementsByClassName('choseTab');
    // 获取下面对应的显示内容  showTab
    var showTab = document.getElementsByClassName('showTab');

    for (var i = 0; i < choseTab.length; i++) {
        choseTab[i].setAttribute('index', i);

        choseTab[i].onclick = function () {
            var index_ = this.getAttribute('index');

            for (var j = 0; j < choseTab.length; j++) {
                choseTab[j].classList.remove('active');
                choseTab[index_].classList.add('active');
            }

            for (var k = 0; k < showTab.length; k++) {
                showTab[k].style.display = 'none';
                showTab[index_].style.display = 'block';
            }
        }
    }

})();



// 点位分布模块 饼图
(function () {
    var myChart = echarts.init(document.querySelector('.pie'));

    var option = {
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        tooltip: {
            // item 表述 鼠标到饼图的每一项内容的时候 触发提示信息
            trigger: 'item',
            // a:series 选项下面的name
            // b:  series下面data中的name
            // c:  series下面data中的value
            // d:  当前value 占所以内容的比例
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '老陈学员分布',
                // pie 饼图  
                type: 'pie',
                // 百分比 具体指都可以  百分比加一号
                // 1：内圆的半径  2 外圆的半径
                radius: ['10%', '75%'],
                // 设置水平方向  垂直方法  50% 居中
                center: ['50%', '50%'],
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 5
                },
                label: {
                    fontSize: 10
                },
                labelLine: {
                    length: 4,
                    length2: 8
                },
                data: [
                    { value: 20, name: '云南' },
                    { value: 26, name: '北京' },
                    { value: 24, name: '山东' },
                    { value: 25, name: '河北' },
                    { value: 20, name: '江苏' },
                    { value: 25, name: '浙江' },
                    { value: 30, name: '四川' },
                    { value: 42, name: '河南' }
                ]
            }
        ]
    };

    myChart.setOption(option);


    // 解决echarts设置option后 ，图标特别小的情况
    //页面加载的时候 调用echarts实例对象的reszie（）方法
    // 必须使用时间监听


    window.addEventListener('load', function () {
        myChart.resize();
    });

    // 当屏幕重置大小的时候 继续调用echarts的重置大小方法
    // 自动适应当前屏幕
    window.addEventListener('resize', function () {
        myChart.resize();
    })

})();


// 中国地图
(function () {
    var myChart = echarts.init(document.querySelector('.geo'));

    var geoCoordMap = {
        '上海': [121.4648, 31.2891],
        '东莞': [113.8953, 22.901],
        '东营': [118.7073, 37.5513],
        '中山': [113.4229, 22.478],
        '临汾': [111.4783, 36.1615],
        '临沂': [118.3118, 35.2936],
        '丹东': [124.541, 40.4242],
        '丽水': [119.5642, 28.1854],
        '乌鲁木齐': [87.9236, 43.5883],
        '佛山': [112.8955, 23.1097],
        '保定': [115.0488, 39.0948],
        '兰州': [103.5901, 36.3043],
        '包头': [110.3467, 41.4899],
        '北京': [116.4551, 40.2539],
        '北海': [109.314, 21.6211],
        '南京': [118.8062, 31.9208],
        '南宁': [108.479, 23.1152],
        '南昌': [116.0046, 28.6633],
        '南通': [121.1023, 32.1625],
        '厦门': [118.1689, 24.6478],
        '台州': [121.1353, 28.6688],
        '合肥': [117.29, 32.0581],
        '呼和浩特': [111.4124, 40.4901],
        '咸阳': [108.4131, 34.8706],
        '哈尔滨': [127.9688, 45.368],
        '唐山': [118.4766, 39.6826],
        '嘉兴': [120.9155, 30.6354],
        '大同': [113.7854, 39.8035],
        '大连': [122.2229, 39.4409],
        '天津': [117.4219, 39.4189],
        '太原': [112.3352, 37.9413],
        '威海': [121.9482, 37.1393],
        '宁波': [121.5967, 29.6466],
        '宝鸡': [107.1826, 34.3433],
        '宿迁': [118.5535, 33.7775],
        '常州': [119.4543, 31.5582],
        '广州': [113.5107, 23.2196],
        '廊坊': [116.521, 39.0509],
        '延安': [109.1052, 36.4252],
        '张家口': [115.1477, 40.8527],
        '徐州': [117.5208, 34.3268],
        '德州': [116.6858, 37.2107],
        '惠州': [114.6204, 23.1647],
        '成都': [103.9526, 30.7617],
        '扬州': [119.4653, 32.8162],
        '承德': [117.5757, 41.4075],
        '拉萨': [91.1865, 30.1465],
        '无锡': [120.3442, 31.5527],
        '日照': [119.2786, 35.5023],
        '昆明': [102.9199, 25.4663],
        '杭州': [119.5313, 29.8773],
        '枣庄': [117.323, 34.8926],
        '柳州': [109.3799, 24.9774],
        '株洲': [113.5327, 27.0319],
        '武汉': [114.3896, 30.6628],
        '汕头': [117.1692, 23.3405],
        '江门': [112.6318, 22.1484],
        '沈阳': [123.1238, 42.1216],
        '沧州': [116.8286, 38.2104],
        '河源': [114.917, 23.9722],
        '泉州': [118.3228, 25.1147],
        '泰安': [117.0264, 36.0516],
        '泰州': [120.0586, 32.5525],
        '济南': [117.1582, 36.8701],
        '济宁': [116.8286, 35.3375],
        '海口': [110.3893, 19.8516],
        '淄博': [118.0371, 36.6064],
        '淮安': [118.927, 33.4039],
        '深圳': [114.5435, 22.5439],
        '清远': [112.9175, 24.3292],
        '温州': [120.498, 27.8119],
        '渭南': [109.7864, 35.0299],
        '湖州': [119.8608, 30.7782],
        '湘潭': [112.5439, 27.7075],
        '滨州': [117.8174, 37.4963],
        '潍坊': [119.0918, 36.524],
        '烟台': [120.7397, 37.5128],
        '玉溪': [101.9312, 23.8898],
        '珠海': [113.7305, 22.1155],
        '盐城': [120.2234, 33.5577],
        '盘锦': [121.9482, 41.0449],
        '石家庄': [114.4995, 38.1006],
        '福州': [119.4543, 25.9222],
        '秦皇岛': [119.2126, 40.0232],
        '绍兴': [120.564, 29.7565],
        '聊城': [115.9167, 36.4032],
        '肇庆': [112.1265, 23.5822],
        '舟山': [122.2559, 30.2234],
        '苏州': [120.6519, 31.3989],
        '莱芜': [117.6526, 36.2714],
        '菏泽': [115.6201, 35.2057],
        '营口': [122.4316, 40.4297],
        '葫芦岛': [120.1575, 40.578],
        '衡水': [115.8838, 37.7161],
        '衢州': [118.6853, 28.8666],
        '西宁': [101.4038, 36.8207],
        '西安': [109.1162, 34.2004],
        '贵阳': [106.6992, 26.7682],
        '连云港': [119.1248, 34.552],
        '邢台': [114.8071, 37.2821],
        '邯郸': [114.4775, 36.535],
        '郑州': [113.4668, 34.6234],
        '鄂尔多斯': [108.9734, 39.2487],
        '重庆': [107.7539, 30.1904],
        '金华': [120.0037, 29.1028],
        '铜川': [109.0393, 35.1947],
        '银川': [106.3586, 38.1775],
        '镇江': [119.4763, 31.9702],
        '长春': [125.8154, 44.2584],
        '长沙': [113.0823, 28.2568],
        '长治': [112.8625, 36.4746],
        '阳泉': [113.4778, 38.0951],
        '青岛': [120.4651, 36.3373],
        '韶关': [113.7964, 24.7028]
    };

    var XAData = [
        [{ name: '西安' }, { name: '北京', value: 100 }],
        [{ name: '西安' }, { name: '上海', value: 100 }],
        [{ name: '西安' }, { name: '广州', value: 100 }],
        [{ name: '西安' }, { name: '西宁', value: 100 }],
        [{ name: '西安' }, { name: '银川', value: 100 }]
    ];

    var XNData = [
        [{ name: '西宁' }, { name: '北京', value: 100 }],
        [{ name: '西宁' }, { name: '上海', value: 100 }],
        [{ name: '西宁' }, { name: '广州', value: 100 }],
        [{ name: '西宁' }, { name: '西安', value: 100 }],
        [{ name: '西宁' }, { name: '银川', value: 100 }]
    ];

    var YCData = [
        [{ name: '银川' }, { name: '北京', value: 100 }],
        [{ name: '银川' }, { name: '广州', value: 100 }],
        [{ name: '银川' }, { name: '上海', value: 100 }],
        [{ name: '银川' }, { name: '西安', value: 100 }],
        [{ name: '银川' }, { name: '西宁', value: 100 }],
    ];

    var ZZData = [
        [{ name: '郑州' }, { name: '哈尔滨', value:100 }],
        [{ name: '郑州' }, { name: '重庆', value:100 }],
        [{ name: '郑州' }, { name: '乌鲁木齐', value:100 }],
        [{ name: '郑州' }, { name: '丽水', value:100 }],
        [{ name: '郑州' }, { name: '成都', value:100 }],




    ];

    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    //var planePath = 'arrow';
    var convertData = function (data) {

        var res = [];
        for (var i = 0; i < data.length; i++) {

            var dataItem = data[i];

            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord],
                    value: dataItem[1].value
                });
            }
        }
        return res;

    };

    var color = ['#a6c84c', '#ffa022', '#46bee9'];//航线的颜色
    var series = [];
    [['西安', XAData], ['西宁', XNData], ['银川', YCData], ['郑州', ZZData]].forEach(function (item, i) {
        series.push({
            name: item[0] + ' Top3',
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: 'red',   //arrow箭头的颜色
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 0,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        },
            {
                name: item[0] + ' Top3',
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] + ' Top3',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i],
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
    });
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params, ticket, callback) {
                if (params.seriesType == "effectScatter") {
                    return "线路：" + params.data.name + "" + params.data.value[2];
                } else if (params.seriesType == "lines") {
                    return params.data.fromName + ">" + params.data.toName + "<br />" + params.data.value;
                } else {
                    return params.name;
                }
            }
        },

        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: true,
                    color: '#fff'
                }
            },
            zoom: 1.2,
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#142957',
                    borderColor: '#195BB9',
                    borderWidth: 1,
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            }
        },
        series: series
    };

    myChart.setOption(option);

    window.addEventListener('load', function () {
        myChart.resize();
    })
    window.addEventListener('resize', function () {
        myChart.resize();
    })
})();

// 全国用户总量统计模块 柱状图
(function () {
    var item = {
        name: '',
        value: 1200,
        itemStyle: {
            color: '#254065'
        },
        // 鼠标经过柱子颜色
        emphasis: {
            itemStyle: {
                color: '#254065'
            }
        },
        tooltip: {
            extraCssText: 'opacity:0'
        }

    }
    var myChart = echarts.init(document.querySelector('.bar'));
    var option = {
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#00fffb' // 0% 处的颜色
            }, {
                offset: 1, color: '#0061ce' // 100% 处的颜色
            }],
            global: false // 缺省为 false
        },
        tooltip: {
            trigger: 'item',
            // 触发的时候 效果  shadow 阴影
            //                line 虚线
            //                none 没效果
            axisPointer: {
                type: 'none'
            }
        },
        // 表格
        grid: {
            left: '0%',
            right: '3%',
            bottom: '3%',
            top: '3%',
            containLabel: true,
            // 是否显示网格
            show: true,
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        xAxis: [
            {
                type: 'category',
                data: ['郑州', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'], axisTick: {
                    alignWithLabel: false,
                    show: false
                },
                axisLabel: {
                    color: "#71f2fb"
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)',
                    }
                }

            }
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#71f2fb"
                },
                splitLine: {
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                }
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('load', function () {
        myChart.resize()
    });
    window.addEventListener('resize', function () {
        myChart.resize()
    })
})();


// 订单模块 订单显示隐藏 订单自动切换

(function () {
    // 找到时间选项  365天 90天 30天 24小时
    var timeTab = document.getElementsByClassName('filter')[0].children;

    // 找到所有对应显示的内容
    var orderData = document.getElementsByClassName('orderData');
    var index_ = 0;
    var timer = null;//计时器 操作index_的下标
    for (var i = 0; i < timeTab.length; i++) {
        timeTab[i].setAttribute('index', i);

        // 点谁 给事件加选中的样式
        timeTab[i].onclick = function () {
            index_ = this.getAttribute("index");
            for (var j = 0; j < timeTab.length; j++) {
                // timeTab[j].className = '';
                // timeTab[index_].className = 'active';
                timeTab[j].classList.remove('active');
                timeTab[index_].classList.add('active');
            }

            //切换对应内容的显示和隐藏
            // 通过orderDataHidden 类名进行控制
            for (var k = 0; k < orderData.length; k++) {
                orderData[k].classList.add('orderDataHidden');
                orderData[index_].classList.remove('orderDataHidden');
            }
        }
    }


    function autoCheck() {
        timer = setInterval(function () {
            index_++;
            if (index_ >= timeTab.length) {
                index_ = 0;
            }
            timeTab[index_].click();
        }, 1500);

    }
    autoCheck();

    // 鼠标来到订单框的时候  计时器停
    // 鼠标移除的时候 计时器继续进行

    var order = document.getElementsByClassName('order')[0];

    order.onmouseenter = function () {
        clearInterval(timer);
    }


    order.onmouseleave = function () {
        autoCheck(), 1500;
    }
})();



// 销售统计模块
(function () {
    var data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
    var myChart = echarts.init(document.querySelector('.sline'));

    var option = {
        color: ['#00f2f1', '#ed3f35'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['预期销售额', '实际销售额'],
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色
            },
            right: '10%' // 距离右边10%
        },
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show: true,// 显示边框
            borderColor: '#012f4a',// 边框颜色
            containLabel: true // 包含刻度文字在内
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd' // 文本颜色
            },
            axisLine: {
                show: false // 去除轴线
            },
            boundaryGap: false  // 去除轴内间距
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false  // 去除刻度
            },
            axisLabel: {
                color: '#4c9bfd' // 文字颜色
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a' // 分割线颜色
                }
            }
        },
        series: [
            {
                name: '预期销售额',
                type: 'line',
                stack: 'Total',
                data: data.year[0],
                smooth: true// 折现变圆滑
            },
            {
                name: '实际销售额',
                type: 'line',
                stack: 'Total',
                data: data.year[1],
                smooth: true
            }
        ]
    };
    myChart.setOption(option);


    // 点击切换年月日
    var timeTab = document.getElementsByClassName('timeTab');
    var index_ = 0;
    var timer = null;//计时器
    for (var i = 0; i < timeTab.length; i++) {
        timeTab[i].setAttribute('index', i);

        timeTab[i].onclick = function () {
            index_ = this.getAttribute('index');

            for (var j = 0; j < timeTab.length; j++) {
                timeTab[j].classList.remove('active');
                timeTab[index_].classList.add('active');
            }

            // 获取自定义属性携带的时间

            var dataTime = this.getAttribute('data-time');
            // console.log(typeof dataTime);
            // console.log(data[dataTime][0]);
            // console.log(data[dataTime][1]);

            option.series[0].data = data[dataTime][0];
            option.series[1].data = data[dataTime][1];

            //修改option数据后 要重新配置option
            myChart.setOption(option);

        }
    }

    function auto() {
        timer = setInterval(function () {
            index_++;
            if (index_ >= timeTab.length) {
                index_ = 0;
            }

            timeTab[index_].click();
        }, 1000);
    }
    auto();

    // 鼠标移入暂停 移出继续

    var sales = document.querySelector('.sales');
    sales.onmouseenter = function () {
        clearInterval(timer);
    }

    sales.onmouseleave = function () {
        auto();
    }


    window.addEventListener('load', function () {
        myChart.resize();
    })

    window.addEventListener('resize', function () {
        myChart.resize();
    })
})();



//渠道分布 雷达图部分
(function () {
    var myChart = echarts.init(document.querySelector('.radar'));
    var option = {
        radar: {
            //控制圆的大小
            radius: '55%',
            indicator: [
                { name: '机场', max: 100 },
                { name: '商场', max: 100 },
                { name: '火车站', max: 100 },
                { name: '汽车站', max: 100 },
                { name: '地铁', max: 100 }
            ],
            shape: 'circle',
            // 整个雷达图 有几个圈
            splitNumber: 4,
            axisName: {
                //雷达图 文字的颜色
                color: '#4c9bfd'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            }
        },
        tooltip: {
            show: true,
            // 控制提示框组件的显示位置
            position: ['60%', '0%'],
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
        },
        series: [
            {
                name: 'Beijing',
                type: 'radar',
                lineStyle: {
                    normal: {
                        color: '#fff',
                        // width: 1
                    }
                },
                data: [[90, 100, 56, 11, 34]],
                symbol: 'circle',
                symbolSize: 5,
                itemStyle: {
                    color: '#fff'
                },
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 10
                },
                areaStyle: {
                    color: 'rgba(238, 197, 102, 0.6)',
                },


            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('load', function () {
        myChart.resize();
    })
    window.addEventListener('resize', function () {
        myChart.resize();
    })
})();


// 水球图
(function () {
    var myChart = echarts.init(document.querySelector('.water'));

    let compositeScore = 0.68;
    
    var option = {
        graphic: [
            {
                type: "group",
                left: "center",
                top: "68%",
                children: [
                    {
                        type: "text",
                        z: 100,
                        left: "10",
                        top: "middle",
                        style: {
                            fill: "#fff",
                            text: "综合评分",
                            font: "16px PingFangSC-Regular",
                        },
                    },
                ],
            },
        ],
        series: [
            {
                type: "liquidFill", //水位图
                radius: "90%", //显示比例
                center: ["50%", "50%"], //中心点
                data: [compositeScore], // data个数代表波浪数
                color: ["#86daec"], //波浪颜色
                backgroundStyle: {
                    color: {
                        type: "linearGradient",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 1,
                                color: "rgba(17,65,86,0.64)",
                            },
                            {
                                offset: 0.51,
                                color: "rgba(32,70,84,0)",
                            },
                            {
                                offset: 0,
                                color: "rgba(99,254,254,0.35)",
                            },
                        ],
                        globalCoord: false,
                    },
                },
                label: {
                    //标签设置
                    position: ["50%", "50%"],
                    formatter: compositeScore * 100 + "%", //显示文本
                    fontSize: "30px",
                    fontFamily: "DINAlternate-Bold",
                    fontWeight: "bold",
                    color: "#fff",
                },
                outline: {
                    show: true,
                    borderDistance: 5,
                    itemStyle: {
                        borderColor: "#1B5151",
                        borderWidth: 1,
                    },
                },
            },
        ],
    };
    
    
    myChart.setOption(option);
    
    window.addEventListener('resize', function () {
        myChart.resize();
    })
    
    window.addEventListener('load', function () {
        myChart.resize();
    })
    
})();