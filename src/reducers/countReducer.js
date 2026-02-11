export default function countReducer(count, action) {
  switch (action.type) {
    case "added_to_cart":
      return 1;

    case "incremented_count":
      return Number(count) + 1;

    case "decremented_count":
      return count > 1 ? count - 1 : null;

    case "change_count":
      return action.count;

    case "set_count": {
      const nextCount = Number(action.count);
      return !isNaN(nextCount) && nextCount > 0 ? nextCount : null;
    }

    default:
      return count;
  }
}
