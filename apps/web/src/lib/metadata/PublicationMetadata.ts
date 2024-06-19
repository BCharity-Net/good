/* eslint no-use-before-define: 0 */
import type { PostFieldsFragment } from '@good/lens';

import { InvalidMetadataException } from './InvalidMetadataException';
import { PostTags } from './PostTags';

/**
 * The publication metadata fields defined, so that they can be excluded from
 * attribute input
 *
 * Does not using `keyof PublicationMetdata` due to buggy behavior with Exclude/Omit
 */
export type PublicationMetadataFieldNames =
  // | 'version'
  | 'createdAt'
  | 'from' // | 'type'
  | 'post_id';

/**
 * A base class for publication metadata
 */
export class PublicationMetadata {
  /**
   * The ISO6801 string of the time
   */
  createdAt: string;

  /**
   * The profile that created the post
   */
  from;
  /**
   * the publication id of the post or comment
   */
  post_id: string;
  /**
   * The PostTag type of the post or comment
   */
  tag: string;
  /**
   * The metadata version of the post or comment
   */
  version: string;

  /**
   * Creates an instance of PublicationMetadata.
   *
   * @constructor
   * @param {PublicationMetadataBuilder<PublicationMetadata>} builder
   */
  constructor(builder: PublicationMetadataBuilder<PublicationMetadata>) {
    this.version = builder.version;
    this.post_id = builder.post_id;
    this.tag = builder.tag;
    this.createdAt = builder.createdAt;
    this.from = builder.from;
  }
}

/**
 * An abstract base class for building publication metadata
 * @template T The data class to build
 */
export abstract class PublicationMetadataBuilder<
  T extends PublicationMetadata
> {
  /**
   * The attribute map generated from the attributes array. Each `key` field
   * is assigned a key with a corresponding value from the `value` field
   */
  private readonly attributeMap: Map<string, string>;

  /**
   * The publication post createdAt date, from lens
   */
  readonly createdAt: string;

  /**
   * The profile that created the post, from lens
   */
  readonly from;

  /**
   * Utility function to get an value from the attribute map, throwing an
   * exception if the key does not exist
   */

  /**
   * The publication post id assigned by lens
   */
  readonly post_id: string;

  /**
   * A copy of the post to build from
   */
  readonly post: PostFieldsFragment;

  /**
   * The post type, a string enum value in PostTags
   */
  readonly tag: string;

  /**
   * The version string in the set versions
   */
  readonly version: string;

  /**
   * A set of version strings
   *
   */
  versions: Set<string>;

  /**
   * Creates an instance of PublicationMetadataBuilder. Also builds the {@link attributeMap}
   * so that it can be used by builders that inherit from this class with {@link getAttribute}
   *
   * @constructor
   * @param {Set<string>} versions
   * A set of version strings that should be recognized by the builder. Builders that
   * inherit from this class should define in it (or its corresponding data class) the
   * potential versions
   * @param post
   * The Lens Protocol post or comment. See {@link PostFragment} and {@link CommentFragment}
   */
  constructor(versions: Set<string>, post: PostFieldsFragment) {
    this.versions = versions;
    this.post = post;

    const attributeMap = new Map<string, string>();

    if (Object.hasOwn(post, 'attributes')) {
      const { attributes } = post as any;
      for (const fragment of attributes) {
        if (fragment.key !== null && fragment.value !== null) {
          attributeMap.set(fragment.key, fragment.value);
        }
      }
    }

    this.attributeMap = attributeMap;

    const type = this.getAttribute('type');
    const version = this.getAttribute('version');

    if (!this.isPostTag(type)) {
      throw new InvalidMetadataException(
        `Post tag "${type}" does not exist in PostTags`
      );
    }
    if (!this.isVersion(version)) {
      throw new InvalidMetadataException(
        `Metadata version ${version} does not exist in "${versions.entries()}"`
      );
    }

    this.tag = type;
    this.version = version;
    this.post_id = post.id;
    this.createdAt = post.createdAt;
    this.from = { ...post.by!, rawURI: '' };
  }

  /**
   * Utility function that searches the PostTag enum to see if a metadata string value matches a value in the enum
   */
  private isPostTag(tagString: string): boolean {
    const tag = Object.values(PostTags)
      .map((v) => Object.values(v))
      .flat(1)
      .find((tagName) => tagName === tagString);

    return !!tag;
  }

  /**
   * Utility function that tests if a metadata string value matches a version in the versions set
   */
  private isVersion(versionString: string): any {
    return this.versions.has(versionString);
  }
  /**
   * The bethod used to build the data class
   */
  build() {
    const exception = this.getValidationErrors();

    if (exception !== null) {
      throw exception;
    }

    return this.buildObject();
  }
  protected getAttribute(key: string, optional?: { default: string }) {
    const value = this.attributeMap.get(key);
    if (value === undefined) {
      if (optional) {
        return optional.default;
      }
      throw new InvalidMetadataException(`Metadata missing key "${key}"`);
    }
    return value;
  }
  /**
   * Utility function to set an attribute in the attribute map, used when
   * adapting metadata of old versions
   */
  protected setAttribute(key: string, value: string) {
    this.attributeMap.set(key, value);
  }
  /**
   * An abstract method to build the outputted metadata, after validation
   */
  protected abstract buildObject(): T;
  /**
   * An abstract method called in {@link build()} to throw any final validation errors
   * when building the metadata
   */
  protected abstract getValidationErrors(): InvalidMetadataException | null;
}
