const { widget } = figma;
const { useSyncedState, usePropertyMenu, AutoLayout, Text, Input, SVG } =
  widget;
import { propertyIcon, actionIcon, closeIcon } from "./icons";

function Widget() {
  const [objectName, setObjectName] = useSyncedState(
    "objectName",
    "オブジェクト名"
  );
  const [properties, setProperties] = useSyncedState("properties", [
    "プロパティ",
  ]);
  const [actions, setActions] = useSyncedState("actions", ["アクション"]);

  usePropertyMenu(
    [
      {
        itemType: "action",
        propertyName: "add-property",
        tooltip: "プロパティを追加",
        icon: propertyIcon,
      },
      {
        itemType: "action",
        propertyName: "add-action",
        tooltip: "アクションを追加",
        icon: actionIcon,
      },
    ],
    (e) => {
      if (e.propertyName === "add-property") {
        setProperties([...properties, `プロパティ${properties.length + 1}`]);
      } else if (e.propertyName === "add-action") {
        setActions([...actions, `アクション${actions.length + 1}`]);
      }
    }
  );

  return (
    <AutoLayout
      direction="vertical"
      spacing={0}
      padding={0}
      cornerRadius={20}
      fill="#fff"
      stroke="#CCCCCC"
      width={320}
    >
      {/* オブジェクト名エリア */}
      <AutoLayout
        padding={{ vertical: 16, horizontal: 16 }}
        stroke="#CCCCCC"
        width="fill-parent"
      >
        <Input
          value={objectName}
          fontSize={12}
          fontWeight={700}
          width="fill-parent"
          onTextEditEnd={(event) => setObjectName(event.characters)}
          inputBehavior="truncate"
        />
      </AutoLayout>
      {/* 区切り線 */}
      <AutoLayout height={0.5} fill="#CCCCCC" width="fill-parent" />

      {/* プロパティリスト */}
      {properties.length > 0 && (
        <AutoLayout direction="vertical" width="fill-parent">
          {properties.map((prop, i) => (
            <>
              {i > 0 && (
                <AutoLayout
                  height={0.5}
                  width="fill-parent"
                  stroke="#CCCCCC"
                  strokeDashPattern={[2, 2]}
                />
              )}
              <AutoLayout
                key={i}
                padding={{ vertical: 12, horizontal: 16 }}
                spacing={8}
                width="fill-parent"
                verticalAlignItems="center"
              >
                <Input
                  value={prop}
                  fontSize={12}
                  width="fill-parent"
                  onTextEditEnd={(v) => {
                    const newProps = [...properties];
                    newProps[i] = v.characters;
                    setProperties(newProps);
                  }}
                  inputBehavior="truncate"
                />
                <SVG
                  src={closeIcon}
                  onClick={() => {
                    setProperties(properties.filter((_, idx) => idx !== i));
                  }}
                />
              </AutoLayout>
            </>
          ))}
        </AutoLayout>
      )}
      {/* 区切り線 */}
      <AutoLayout height={0.5} fill="#CCCCCC" width="fill-parent" />

      {/* アクションリスト */}
      {actions.length > 0 && (
        <AutoLayout direction="vertical" width="fill-parent">
          {actions.map((action, i) => (
            <>
              {i > 0 && (
                <AutoLayout
                  height={0.5}
                  width="fill-parent"
                  stroke="#CCCCCC"
                  strokeDashPattern={[2, 2]}
                />
              )}
              <AutoLayout
                key={i}
                padding={{ vertical: 12, horizontal: 16 }}
                spacing={8}
                width="fill-parent"
                verticalAlignItems="center"
              >
                <Input
                  value={action}
                  fontSize={12}
                  width="fill-parent"
                  onTextEditEnd={(v) => {
                    const newActions = [...actions];
                    newActions[i] = v.characters;
                    setActions(newActions);
                  }}
                  inputBehavior="truncate"
                />
                <SVG
                  src={closeIcon}
                  onClick={() => {
                    setActions(actions.filter((_, idx) => idx !== i));
                  }}
                />
              </AutoLayout>
            </>
          ))}
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
