import {
  Chart as ChartJS,
  Colors,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";

/**
 * Chart를 등록하고 Option을 관리하는 Class 정의
 */
class ChartUtil {
  constructor() {}

  static chartRegist() {
    ChartJS.register(Colors, ArcElement, Tooltip, Legend, LinearScale);
  }
}

export default ChartUtil;
