import Vue from "vue";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import Icon from "./utils/Icon/Index"
import GameBoard from "./partials/Game/Board"
import GameCard from "./partials/Game/Card"
import AssetBoard from "./partials/Asset/Board"
import AssetCard from "./partials/Asset/Card"
import ReportBoard from "./partials/Report";
import AccountBoard from "./partials/Account/Board";

Vue.component('p-header', Header);
Vue.component('p-footer', Footer);
Vue.component('card-game', GameCard);
Vue.component('board-game', GameBoard);
Vue.component('card-asset', AssetCard);
Vue.component('board-asset', AssetBoard);
Vue.component('board-report', ReportBoard);
Vue.component('board-account', AccountBoard);
Vue.component('icon', Icon);
