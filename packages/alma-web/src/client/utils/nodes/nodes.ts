import { IContextSerialized, Node } from 'alma-graph';
import {
    AdditionNode,
    SubtractionNode,
    MultiplicationNode,
    DivisionNode,
    CameraNode,
    ClassConstructor,
    CosineNode,
    GLSLNode,
    MixNode,
    MinimumNode,
    MaximumNode,
    ModuloNode,
    SimplexNoiseNode,
    SineNode,
    ArccosineNode,
    SignNode,
    SwizzleNode,
    TimeNode,
    UVNode,
    Vector2Node,
    Vector3Node,
    Vector4Node,
    WebGLNode,
    TextureNode,
    CreationEffectNode,
    FractionalNode,
    AbsoluteNode,
    FloorNode,
    CeilNode,
    PowerNode,
    SquareRootNode,
    InverseSquareRootNode,
    ArcsineNode,
    TangentNode,
    ArctangentNode,
    ExponentiationNode,
    LogarithmNode,
    LengthNode,
    DistanceNode,
    NormalizeNode,
    RadiansNode,
    DegreesNode,
    ClampNode,
    StepNode,
    SmoothstepNode,
    CrossProductNode,
    DotProductNode,
    PINode,
    ResolutionNode
} from 'alma-webgl';

import { IContextMenuContainerSection } from '../../components/ContextMenu/ContextMenuContainer/ContextMenuContainer.types';
import { IContextMenuItemProps } from '../../components/ContextMenu/ContextMenuItem/ContextMenuItem.types';
import * as creationExample from '../../examples/creation.json';
import * as gradientExample from '../../examples/gradient.json';

const extractItem = (
    createNodeCallback: (nodeClass: ClassConstructor<WebGLNode>) => void
): ((nodeClass: ClassConstructor<WebGLNode>) => IContextMenuItemProps) => {
    return (nodeClass: ClassConstructor<WebGLNode>) => ({
        // @ts-ignore
        label: nodeClass.nodeName,
        // @ts-ignore
        icon: nodeClass.icon,
        onClick: () => {
            createNodeCallback(nodeClass);
        }
    });
};

export const nodesHierarchy: (
    createNodeCallback: (node: ClassConstructor<Node>) => void
) => IContextMenuContainerSection[] = createNodeCallback => [
    {
        items: [
            {
                icon: 'shapes',
                label: 'Common',
                items: [
                    {
                        items: [
                            ModuloNode,
                            MixNode,
                            FractionalNode,
                            MinimumNode,
                            MaximumNode,
                            AbsoluteNode,
                            SignNode,
                            FloorNode,
                            CeilNode,
                            ClampNode,
                            StepNode,
                            SmoothstepNode,
                            GLSLNode
                        ].map(extractItem(createNodeCallback))
                    }
                ]
            },
            {
                icon: 'hive',
                label: 'Accessors',
                items: [
                    {
                        items: [TimeNode, UVNode, ResolutionNode, PINode].map(extractItem(createNodeCallback))
                    }
                ]
            },
            {
                icon: 'percent',
                label: 'Math',
                items: [
                    {
                        items: [AdditionNode, SubtractionNode, MultiplicationNode, DivisionNode].map(
                            extractItem(createNodeCallback)
                        )
                    }
                ]
            },
            {
                icon: 'change_history',
                label: 'Trigonometry',
                items: [
                    {
                        items: [
                            RadiansNode,
                            DegreesNode,
                            SineNode,
                            ArcsineNode,
                            CosineNode,
                            ArccosineNode,
                            TangentNode,
                            ArctangentNode
                        ].map(extractItem(createNodeCallback))
                    }
                ]
            },
            {
                icon: 'trending_up',
                label: 'Exponential',
                items: [
                    {
                        items: [
                            ExponentiationNode,
                            LogarithmNode,
                            PowerNode,
                            SquareRootNode,
                            InverseSquareRootNode
                        ].map(extractItem(createNodeCallback))
                    }
                ]
            },
            {
                icon: 'polyline',
                label: 'Vector',
                items: [
                    {
                        items: [
                            Vector2Node,
                            Vector3Node,
                            Vector4Node,
                            LengthNode,
                            DistanceNode,
                            NormalizeNode,
                            CrossProductNode,
                            DotProductNode,
                            SwizzleNode
                        ].map(extractItem(createNodeCallback))
                    }
                ]
            },
            {
                icon: 'texture',
                label: 'Texture',
                items: [{ items: [TextureNode, CameraNode].map(extractItem(createNodeCallback)) }]
            },
            {
                icon: 'grain',
                label: 'Noise',
                items: [{ items: [SimplexNoiseNode].map(extractItem(createNodeCallback)) }]
            },
            {
                icon: 'stream',
                label: 'Effect',
                items: [{ items: [CreationEffectNode].map(extractItem(createNodeCallback)) }]
            }
        ]
    }
];

export const examplesHierarchy: (
    createNodeCallback: (serialized: IContextSerialized) => void
) => IContextMenuContainerSection[] = createContextCallback => [
    {
        items: [
            {
                label: 'Gradient',
                icon: 'stream',
                onClick: () => createContextCallback(gradientExample as IContextSerialized)
            },
            {
                label: 'Creation',
                icon: 'stream',
                onClick: () => createContextCallback(creationExample as IContextSerialized)
            }
        ]
    }
];
