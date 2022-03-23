<template>
  <div id="form-import">
      <span class="title">
        Import Data
      </span>
    <p class="description">You can import data from axie.management <a href="https://tracker.axie.management/config" style="color: #ACB9FF; text-decoration: underline">here</a>
      Please upload that (.csv) file to import data</p>
    <p class="mt-6 ml-2" style="width: 100%; font-weight: bold">File</p>
    <div class="input-file-wrapper">
      <input type="file" accept="text/csv" id="input-file-hidden" @change="fileSelected"/>
      <div class="input-file-btn" @click="inputClick">
        <span id="input-file-name">{{ fileName }}</span>
        <span class="select-btn">Select file</span>
      </div>
    </div>
    <button class="btn" @click="submitImport">Import</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "FormImport",
  data() {
    return {
      done: false,
      fileName: '',
      data:  null,
    }
  },

  methods: {
    ...mapActions('config', ['fetchData']),

    inputClick() {
      document.getElementById('input-file-hidden').click();
    },
    csvToArray(str, delimiter = ",") {
      const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
      const arr = []
      const rows = str.slice(str.indexOf("\n") + 1).split("\n");
      for (let j = 0; j < rows.length; j++) {
        const row = rows[j];
        const v = row.split(delimiter);
        const obj = {};
        if (v.length < 2) continue;
        for (let i = 0; i < v.length; i++) {
          obj[headers[i]] = v[i];
        }
        arr.push(obj)
      }
      return arr;
    },
    submitImport() {
      const data = this.$store.state.config.modal.data;

      this.$axios.$post(`/move?game=${data.game.id}`, {
        rows: this.data
      }).then((res) => {
        console.log("res", res)
        this.$store.commit('config/SET_MODAL', null);
        window.location.reload()
      })
    },
    fileSelected(e) {
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log(event.target.result); // the CSV content as string
        const rs = this.csvToArray(event.target.result)
        const final = [];
        for(const item of rs ) {
          const obj = {};
          obj.wallet = item.ronin.replace('ronin:', '0x');
          obj.earn_ratio = Number(item.scholarPercentage)/100;
          obj.meta = item;
          final.push(obj)

        }
        this.data = final;
      };
      reader.readAsText(e.target.files[0]);
      this.fileName = e.target.value
    }

  },
}
</script>

<style scoped>
#form-import {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 530px;
}

.title {
  font-weight: 700;
  font-size: 18px;
}

.description {
  text-align: center;
  margin-top: 12px;
  white-space: pre-line;
}

.input-file-wrapper {
  position: relative;
  width: 100%;
  margin-top: 8px;
}

#input-file-hidden {
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.input-file-btn {
  height: 40px;
  width: 100%;
  border: 1px solid #DDE0F7;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 8px;
  color: #ACB9FF;

}

.btn {
  margin-top: 24px;
  border-radius: 20px;
  height: 32px;
  width: 132px;
  color: #fff;
  line-height: 16px;
  background: #0f43f9;
}

.select-btn {
  color: #fff;
  background: #ACB9FF;
  padding: 4px 8px;
  border-radius: 20px;
  position: absolute;
  z-index: 1;
  right: 8px;
  top: 6px;
  font-size: 10px;
}
</style>
