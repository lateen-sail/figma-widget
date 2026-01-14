const { widget } = figma;
const { useSyncedState, usePropertyMenu, AutoLayout, Text, Input, SVG } =
  widget;
import {
  propertyIcon,
  actionIcon,
  eyeIcon,
  eyeOffIcon,
  closeIcon,
} from "./icons";

function Widget() {
  const [objectName, setObjectName] = useSyncedState(
    "objectName",
    "オブジェクト名"
  );
  const [properties, setProperties] = useSyncedState("properties", [
    "プロパティ",
  ]);
  const [actions, setActions] = useSyncedState("actions", ["アクション"]);
  const [type, setType] = useSyncedState("type", "シングル");
  const [isDisplayDetail, setIsDisplayDetail] = useSyncedState(
    "isDisplayDetail",
    true
  );

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
      {
        itemType: "action",
        propertyName: "toggle-display",
        tooltip: isDisplayDetail ? "詳細を隠す" : "詳細を表示",
        icon: isDisplayDetail ? eyeOffIcon : eyeIcon,
      },
    ],
    (e) => {
      if (e.propertyName === "add-property") {
        setProperties([...properties, `プロパティ${properties.length + 1}`]);
      } else if (e.propertyName === "add-action") {
        setActions([...actions, `アクション${actions.length + 1}`]);
      } else if (e.propertyName === "toggle-display") {
        setIsDisplayDetail(!isDisplayDetail);
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
      width={280}
    >
      {/* オブジェクト名エリア */}
      <AutoLayout
        padding={{ top: 12, bottom: 16, left: 16, right: 16 }}
        width="fill-parent"
        direction="vertical"
        spacing={8}
      >
        <AutoLayout
          padding={4}
          fill="#eeeeee"
          cornerRadius={4}
          onClick={() =>
            setType(type === "シングル" ? "コレクション" : "シングル")
          }
          horizontalAlignItems="center"
        >
          <Text fontSize={10} fill="#999999" fontWeight={700}>
            {type}
          </Text>
        </AutoLayout>
        <Input
          value={objectName}
          fontSize={14}
          fontWeight={700}
          width="fill-parent"
          onTextEditEnd={(event) => setObjectName(event.characters)}
          inputBehavior="truncate"
        />
      </AutoLayout>
      {/* プロパティ・アクションリスト（詳細表示時のみ） */}
      {isDisplayDetail && properties.length > 0 && (
        <>
          <AutoLayout height={2} fill="#CCCCCC" width="fill-parent" />
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
        </>
      )}
      {isDisplayDetail && actions.length > 0 && (
        <>
          <AutoLayout height={1} fill="#CCCCCC" width="fill-parent" />
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
        </>
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
