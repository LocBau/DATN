import React from "react";
import { View, StyleSheet } from "react-native";
const ItemPartTask = ({ pos, part, color, lenght }) => {
  const getBoxStyles = (pos, part, color) => {
    console.log("vo itemPart");
    console.log("pos:", pos);
    console.log("part:", part);
    console.log("color:", color);
    console.log("lenght:", lenght);
    let containerBox = {};
    switch (pos) {
      case 1:
        console.log("vo pos 1");
        containerBox = {
          ...containerBox,
          position: "absolute",
        };
        switch (part) {
          case "head":
            console.log("vo head");
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 0,
            };
            break;
          case "body": {
            if (lenght) {
              switch (lenght) {
                case 1:
                  console.log("lengh 1 day");
                  containerBox = {
                    ...containerBox,
                    width: 35,
                    height: -15,
                  };
                  break;
                case 2:
                  console.log("lengh 2 day");
                  containerBox = {
                    ...containerBox,
                    width: 55,
                    height: 35,
                    left: 20,
                  };
                  break;
                case 3:
                  console.log("lengh 3 day");
                  containerBox = {
                    ...containerBox,
                    width: 105,
                    height: 35,
                    left: 20,
                  };
                  break;
                case 4:
                  console.log("lengh 4 day");
                  containerBox = {
                    ...containerBox,
                    width: 155,
                    height: 35,
                    left: 20,
                  };
                  break;
                case 5:
                  console.log("lengh 5 day");
                  containerBox = {
                    ...containerBox,
                    width: 205,
                    height: 35,
                    left: 20,
                  };
                  break;
                case 6:
                  console.log("lengh 6 day");
                  containerBox = {
                    ...containerBox,
                    width: 255,
                    height: 35,
                    left: 20,
                  };
                  break;
                case 7:
                  console.log("lengh 7 day");
                  containerBox = {
                    ...containerBox,
                    width: 310,
                    height: 35,
                    left: 20,
                  };
                  break;
              }
            }

            break;
          }
          case "foot":
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 0,
            };
            break;
        }
        console.log("xem full pos1:", containerBox);
        break;
      // pos 2:
      case 2:
        console.log("vo pos 2");
        containerBox = {
          ...containerBox,
          position: "absolute",
        };
        switch (part) {
          case "head":
            console.log("vo head");
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 55,
            };
            break;
          case "body": {
            if (lenght) {
              switch (lenght) {
                case 1:
                  console.log("lengh 1 day");
                  containerBox = {
                    ...containerBox,
                    width: 35,
                    height: 35,
                  };
                  break;
                case 2:
                  console.log("lengh 2 day");
                  containerBox = {
                    ...containerBox,
                    width: 55,
                    height: 35,
                    left: 70,
                  };
                  break;
                case 3:
                  console.log("lengh 3 day");
                  containerBox = {
                    ...containerBox,
                    width: 105,
                    height: 35,
                    left: 70,
                  };
                  break;
                case 4:
                  console.log("lengh 4 day");
                  containerBox = {
                    ...containerBox,
                    width: 155,
                    height: 35,
                    left: 70,
                  };
                  break;
                case 5:
                  console.log("lengh 5 day");
                  containerBox = {
                    ...containerBox,
                    width: 205,
                    height: 35,
                    left: 70,
                  };
                  break;
                case 6:
                  console.log("lengh 6 day");
                  containerBox = {
                    ...containerBox,
                    width: 255,
                    height: 35,
                    left: 70,
                  };
                  break;
                // case 7:
                //   console.log("lengh 7 day");
                //   containerBox = {
                //     ...containerBox,
                //     width: 310,
                //     height: 35,
                //     left: 20,
                //   };
                //   break;
              }
            }

            break;
          }
          case "foot":
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 55,
            };
            break;
        }
        console.log("xem full pos1:", containerBox);
        break;
      // pos 3:
      case 3:
        console.log("vo pos 3");
        containerBox = {
          ...containerBox,
          position: "absolute",
        };
        switch (part) {
          case "head":
            console.log("vo head");
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 105,
            };
            break;
          case "body": {
            if (lenght) {
              switch (lenght) {
                case 1:
                  console.log("lengh 1 day");
                  containerBox = {
                    ...containerBox,
                    width: 35,
                    height: 35,
                  };
                  break;
                case 2:
                  console.log("lengh 2 day");
                  containerBox = {
                    ...containerBox,
                    width: 55,
                    height: 35,
                    left: 120,
                  };
                  break;
                case 3:
                  console.log("lengh 3 day");
                  containerBox = {
                    ...containerBox,
                    width: 105,
                    height: 35,
                    left: 120,
                  };
                  break;
                case 4:
                  console.log("lengh 4 day");
                  containerBox = {
                    ...containerBox,
                    width: 155,
                    height: 35,
                    left: 120,
                  };
                  break;
                case 5:
                  console.log("lengh 5 day");
                  containerBox = {
                    ...containerBox,
                    width: 205,
                    height: 35,
                    left: 120,
                  };
                  break;
              }
            }

            break;
          }
          case "foot":
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 105,
            };
            break;
        }
        console.log("xem full pos1:", containerBox);
        break;
      // pos 4:
      case 4:
        console.log("vo pos 4");
        containerBox = {
          ...containerBox,
          position: "absolute",
        };
        switch (part) {
          case "head":
            console.log("vo head");
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 155,
            };
            break;
          case "body": {
            if (lenght) {
              switch (lenght) {
                case 1:
                  console.log("lengh 1 day");
                  containerBox = {
                    ...containerBox,
                    width: 35,
                    height: 35,
                  };
                  break;
                case 2:
                  console.log("lengh 2 day");
                  containerBox = {
                    ...containerBox,
                    width: 55,
                    height: 35,
                    left: 155,
                  };
                  break;
                case 3:
                  console.log("lengh 3 day");
                  containerBox = {
                    ...containerBox,
                    width: 105,
                    height: 35,
                    left: 155,
                  };
                  break;
                case 4:
                  console.log("lengh 4 day");
                  containerBox = {
                    ...containerBox,
                    width: 155,
                    height: 35,
                    left: 170,
                  };
                  break;
                case 5:
                  console.log("lengh 5 day");
                  containerBox = {
                    ...containerBox,
                    width: 205,
                    height: 35,
                    left: 155,
                  };
                  break;
              }
            }

            break;
          }
          case "foot":
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 155,
            };
            break;
        }
        console.log("xem full pos1:", containerBox);
        break;
      // pos 5:
      case 5:
        console.log("vo pos 5");
        containerBox = {
          ...containerBox,
          position: "absolute",
        };
        switch (part) {
          case "head":
            console.log("vo head");
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 210,
            };
            break;
          case "body": {
            if (lenght) {
              switch (lenght) {
                case 1:
                  console.log("lengh 1 day");
                  containerBox = {
                    ...containerBox,
                    width: 35,
                    height: 35,
                  };
                  break;
                case 2:
                  console.log("lengh 2 day");
                  containerBox = {
                    ...containerBox,
                    width: 55,
                    height: 35,
                    left: 210,
                  };
                  break;
                case 3:
                  console.log("lengh 3 day");
                  containerBox = {
                    ...containerBox,
                    width: 105,
                    height: 35,
                    left: 225,
                  };
                  break;
              }
            }

            break;
          }
          case "foot":
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 210,
            };
            break;
        }
        console.log("xem full pos1:", containerBox);
        break;
      // pos 6:
      case 6:
        console.log("vo pos 6");
        containerBox = {
          ...containerBox,
          position: "absolute",
        };
        switch (part) {
          case "head":
            console.log("vo head");
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 260,
            };
            break;
          case "body": {
            if (lenght) {
              switch (lenght) {
                case 1:
                  console.log("lengh 1 day");
                  containerBox = {
                    ...containerBox,
                    width: 35,
                    height: 35,
                  };
                  break;
                case 2:
                  console.log("lengh 2 day");
                  containerBox = {
                    ...containerBox,
                    width: 55,
                    height: 35,
                    left: 275,
                  };
                  break;
                case 3:
                  console.log("lengh 3 day");
                  containerBox = {
                    ...containerBox,
                    width: 105,
                    height: 35,
                    left: 275,
                  };
                  break;
                default:
                  console.log("lengh > 3 day");
                  containerBox = {
                    ...containerBox,
                    width: 105,
                    height: 35,
                    left: 275,
                  };
                  break;
              }
            }

            break;
          }
          case "foot":
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 260,
            };
            break;
        }
        console.log("xem full pos1:", containerBox);
        break;
      // pos 7:
      case 7:
        console.log("vo pos 7");
        containerBox = {
          ...containerBox,
          position: "absolute",
        };
        switch (part) {
          case "head":
            console.log("vo head");
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 310,
            };
            break;
          case "body": {
            if (lenght) {
              switch (lenght) {
                case 1:
                  console.log("lengh 1 day");
                  containerBox = {
                    ...containerBox,
                    width: 35,
                    height: 35,
                  };
                  break;
                case 2:
                  console.log("lengh 2 day");
                  containerBox = {
                    ...containerBox,
                    width: 55,
                    height: 35,
                    left: 310,
                  };
                  break;
                case 3:
                  console.log("lengh 3 day");
                  containerBox = {
                    ...containerBox,
                    width: 105,
                    height: 35,
                    left: 310,
                  };
                  break;
              }
            }

            break;
          }
          case "foot":
            containerBox = {
              ...containerBox,
              borderRadius: 35,
              width: 35,
              height: 35,
              left: 310,
            };
            break;
        }
        console.log("xem full pos1:", containerBox);
        break;
    }

    return {
      container: {
        ...containerBox,
        backgroundColor: color,

        // width: 40,
        // height: 40,

        // Thêm các style chung nếu cần
      },
    };
  };
  const styles = StyleSheet.create(getBoxStyles(pos, part, color));

  return <View style={styles.container} />;
};
export default ItemPartTask;
