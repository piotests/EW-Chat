class LocalStorage {

    setItem(obj_name, props) {
        window.localStorage.setItem(obj_name, JSON.stringify(props));
    }

    getItem(obj_name, prop_name = '') {
        let get = window.localStorage.getItem(obj_name);
        let res = JSON.parse(get);
        if (prop_name !== '') {
            return res[prop_name];
        }
        return res;
    }

    editItem(obj_name, prop_name, prop_value) {
        let get_json_object = this.getItem(obj_name);
        if (get_json_object) {
            get_json_object[prop_name] = prop_value;
            this.setItem(obj_name, get_json_object);
        }
    }

    removeItem(obj_name) {
        window.localStorage.removeItem(obj_name);
    }

    clear() {
        window.localStorage.clear();
    }
}

export default new LocalStorage();