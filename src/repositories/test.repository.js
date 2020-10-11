import Service from "./src/services/Base.service.js";

const resource = "test";

export default {
  get() {
    return Service.get(resource);
  },

  add(data) {
    return Service.post(resource, data);
  },

  delete(id) {
    return Service.delete(resource, id);
  }
};
