import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export default function ArrowBackCircle({
  size = 40,
  color = "#FFF8F8",
  strokeWidth = 1,
  onPress,
  style,
}: Props & { onPress?: () => void; style?: StyleProp<ViewStyle> }) {
  const dimension = size;

  const Container = onPress ? Pressable : View;

  const arrowStroke = strokeWidth * 4;

  return (
    <Container
      style={[
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          borderWidth: strokeWidth,
          borderColor: color,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
      onPress={onPress}
      hitSlop={12}
    >
      <Svg
        width={dimension}
        height={dimension}
        pointerEvents="none"
        style={{ position: "absolute" }}
      >
        <Path
          d={`M${dimension * 0.6} ${dimension * 0.3} L ${dimension * 0.4} ${dimension * 0.5} L ${dimension * 0.6} ${dimension * 0.7}`}
          stroke={color}
          strokeWidth={arrowStroke}
          fill="none"
        />
      </Svg>
    </Container>
  );
}
