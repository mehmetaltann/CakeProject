exports.dbInsertMany = async (transectionObj, data) => {
  try {
    const res = await transectionObj.insertMany(data);
    return res;
  } catch (e) {
    console.error(e);
  }
};

exports.dbSave = async (transectionObj) => {
  try {
    const res = await transectionObj.save();
    return res;
  } catch (e) {
    console.error(e);
  }
};

exports.dbFind = async (transectionObj, fQuery = null, sortQuery = null) => {
  try {
    const res = await transectionObj.find(fQuery).sort(sortQuery);
    return res;
  } catch (e) {
    console.error(e);
  }
};

exports.dbFindOne = async (transectionObj, fQuery = null, sortQuery = null) => {
  try {
    const res = await transectionObj.findOne(fQuery).sort(sortQuery);
    return res;
  } catch (e) {
    console.error(e);
  }
};

exports.dbFindAggregate = async (transectionObj, query) => {
  try {
    const res = await transectionObj.aggregate(query);
    return res;
  } catch (e) {
    console.error(e);
  }
};

exports.dbFindByIdAndDelete = async (transectionObj, id) => {
  try {
    const res = await transectionObj.findByIdAndDelete(id);
    return res;
  } catch (e) {
    console.error(e);
  }
};

exports.dbFindOneAndDelete = async (transectionObj, query) => {
  try {
    const res = await transectionObj.findOneAndDelete(query);
    return res;
  } catch (e) {
    console.error(e);
  }
};

exports.dbFindOneAndUpdate = async (transectionObj, filter, update) => {
  try {
    const res = await transectionObj.findOneAndUpdate(filter, update);
    return res;
  } catch (e) {
    console.error(e);
  }
};

exports.dbFindByIdAndUpdate = async (transectionObj, id, updateData) => {
  try {
    const res = await transectionObj.findByIdAndUpdate(id, updateData);
    return res;
  } catch (e) {
    console.error(e);
  }
};
