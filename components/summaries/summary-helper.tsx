export const parseSection = (
  section: string
): {
  title: string;
  points: string[];
} => {
  const [title, ...content] = section.split("\n").map((line) => line.trim());
  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: string[] = [];
  let currentPoint = "";

  content.forEach((line) => {
    if (line.startsWith(".")) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = line.substring(1).trim(); // Remove '.' and trim
    } else if (!line) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = "";
    } else {
      currentPoint += " " + line;
    }
  });

  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleanTitle,
    points: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    ),
  };
};
