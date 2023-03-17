import store from '@/store/index.js'
import toBase64ForDefaultValue from './html2base64'
import { addCircleAnimation } from '@/utils/digital/utils.js'
export default function realTimeRander(chart, componentInfo, statename, open) {
    // document.getElementById(chart.chartType).style.display = "block";
    store.commit(statename, componentInfo);
    // $viewer.entities.removeById(chart.id);
    Cesium.defined($viewer.entities.getById(chart.id)) && $viewer.entities.removeById(chart.id);
    if (!Cesium.defined($viewer.entities.getById(chart.id + 'special'))) {
        if (open) {
            let { longitude, latitude, height } = chart.center2
            addCircleAnimation(
                chart.id + 'special',
                $viewer,
                Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
                height
            );
        }
    } else {
        if (open) {
            $viewer.entities.getById(chart.id + 'special')._show = true;
        } else {
            $viewer.entities.getById(chart.id + 'special')._show = false;
        }
    }
    if (!Cesium.defined($viewer.entities.getById(chart.id))) {
        toBase64ForDefaultValue(chart.chartType).then((res1) => {
            chart.content = res1;
            new Cesium.CesiumWallBillboard(chart);
            // document.getElementById(chart.chartType).style.display = "none";
        });
    }

}